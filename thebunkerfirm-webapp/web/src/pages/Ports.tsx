import { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Chip,
} from '@mui/material'
import { Add, Edit, Delete, LocationOn } from '@mui/icons-material'
import { supabase } from '../lib/supabase'
import { Port } from '../types'

export default function Ports() {
  const [ports, setPorts] = useState<Port[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [editingPort, setEditingPort] = useState<Port | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    city: '',
    contact_email: '',
    contact_phone: '',
  })

  useEffect(() => {
    fetchPorts()
  }, [])

  const fetchPorts = async () => {
    try {
      const { data, error } = await supabase
        .from('ports')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setPorts(data || [])
    } catch (error) {
      console.error('Error fetching ports:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async () => {
    try {
      if (editingPort) {
        const { error } = await supabase
          .from('ports')
          .update(formData)
          .eq('id', editingPort.id)
        if (error) throw error
      } else {
        const { error } = await supabase
          .from('ports')
          .insert([formData])
        if (error) throw error
      }
      
      await fetchPorts()
      handleClose()
    } catch (error) {
      console.error('Error saving port:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Er du sikker på at du vil slette denne havn?')) {
      try {
        const { error } = await supabase
          .from('ports')
          .delete()
          .eq('id', id)
        if (error) throw error
        await fetchPorts()
      } catch (error) {
        console.error('Error deleting port:', error)
      }
    }
  }

  const handleOpen = (port?: Port) => {
    if (port) {
      setEditingPort(port)
      setFormData({
        name: port.name,
        country: port.country,
        city: port.city,
        contact_email: port.contact_email || '',
        contact_phone: port.contact_phone || '',
      })
    } else {
      setEditingPort(null)
      setFormData({
        name: '',
        country: '',
        city: '',
        contact_email: '',
        contact_phone: '',
      })
    }
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setEditingPort(null)
  }

  if (loading) {
    return <Typography>Indlæser havne...</Typography>
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Havne
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpen()}
        >
          Tilføj Havn
        </Button>
      </Box>

      <Grid container spacing={3}>
        {ports.map((port) => (
          <Grid item xs={12} md={6} lg={4} key={port.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography variant="h6" component="div">
                    {port.name}
                  </Typography>
                  <Box>
                    <IconButton size="small" onClick={() => handleOpen(port)}>
                      <Edit />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDelete(port.id)}>
                      <Delete />
                    </IconButton>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocationOn sx={{ mr: 1, fontSize: 16 }} />
                  <Typography variant="body2" color="text.secondary">
                    {port.city}, {port.country}
                  </Typography>
                </Box>

                {port.contact_email && (
                  <Chip
                    label={port.contact_email}
                    size="small"
                    sx={{ mr: 1, mb: 1 }}
                  />
                )}
                
                {port.contact_phone && (
                  <Chip
                    label={port.contact_phone}
                    size="small"
                    sx={{ mb: 1 }}
                  />
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {ports.length === 0 && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" color="text.secondary">
            Ingen havne endnu
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Tilføj din første havn for at komme i gang
          </Typography>
          <Button variant="contained" onClick={() => handleOpen()}>
            Tilføj Havn
          </Button>
        </Box>
      )}

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingPort ? 'Rediger Havn' : 'Tilføj Ny Havn'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Havn Navn"
            fullWidth
            variant="outlined"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Land"
            fullWidth
            variant="outlined"
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="By"
            fullWidth
            variant="outlined"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Kontakt Email"
            type="email"
            fullWidth
            variant="outlined"
            value={formData.contact_email}
            onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Kontakt Telefon"
            fullWidth
            variant="outlined"
            value={formData.contact_phone}
            onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuller</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingPort ? 'Opdater' : 'Tilføj'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
