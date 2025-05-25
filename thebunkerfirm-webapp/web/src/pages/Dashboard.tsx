import { Box, Typography, Grid, Card, CardContent, Paper } from '@mui/material'
import { Anchor, Business, TrendingUp, People } from '@mui/icons-material'

const stats = [
  {
    title: 'Aktive Havne',
    value: '12',
    icon: <Anchor sx={{ fontSize: 40 }} />,
    color: '#1976d2',
  },
  {
    title: 'Partnere',
    value: '45',
    icon: <Business sx={{ fontSize: 40 }} />,
    color: '#f57c00',
  },
  {
    title: 'Månedlig Vækst',
    value: '+15%',
    icon: <TrendingUp sx={{ fontSize: 40 }} />,
    color: '#2e7d32',
  },
  {
    title: 'Team Medlemmer',
    value: '8',
    icon: <People sx={{ fontSize: 40 }} />,
    color: '#d32f2f',
  },
]

export default function Dashboard() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Velkommen til The Bunker Firm's interne portal
      </Typography>

      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box>
                    <Typography color="text.secondary" gutterBottom>
                      {stat.title}
                    </Typography>
                    <Typography variant="h4" component="div">
                      {stat.value}
                    </Typography>
                  </Box>
                  <Box sx={{ color: stat.color }}>
                    {stat.icon}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Seneste Aktivitet
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Her vil du kunne se de seneste aktiviteter i systemet, såsom nye havne, opdateringer og mere.
          </Typography>
        </Paper>
      </Box>
    </Box>
  )
}
