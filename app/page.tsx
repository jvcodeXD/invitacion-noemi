'use client';

import Link from 'next/link';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Grid,
  Stack,
} from '@mui/material';
import {
  School as GraduationCapIcon,
  People as UsersIcon,
  ArrowForward as ArrowRightIcon,
  Share as ShareIcon,
} from '@mui/icons-material';

export default function HomePage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #312e81 0%, #581c87 50%, #be185d 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        {/* Icono principal flotante */}
        <Box
          sx={{
            textAlign: 'center',
            mb: 4,
            animation: 'float 3s ease-in-out infinite',
            '@keyframes float': {
              '0%, 100%': { transform: 'translateY(0px)' },
              '50%': { transform: 'translateY(-20px)' },
            },
          }}
        >
          <GraduationCapIcon
            sx={{
              fontSize: { xs: 100, md: 128 },
              color: '#c084fc',
            }}
          />
        </Box>

        {/* Contenido principal */}
        <Paper
          elevation={24}
          sx={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: 6,
            p: { xs: 4, md: 8 },
            animation: 'fadeIn 0.8s ease-out',
            '@keyframes fadeIn': {
              from: { opacity: 0, transform: 'translateY(30px)' },
              to: { opacity: 1, transform: 'translateY(0)' },
            },
          }}
        >
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              color: 'white',
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: '2rem', md: '3.5rem' },
            }}
          >
            Sistema de Invitaciones
          </Typography>
          <Typography
            variant="h3"
            sx={{
              textAlign: 'center',
              background: 'linear-gradient(90deg, #c084fc 0%, #f472b6 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 700,
              mb: 4,
              fontSize: { xs: '1.75rem', md: '3rem' },
            }}
          >
            de Graduación
          </Typography>

          <Typography
            variant="h6"
            sx={{
              textAlign: 'center',
              color: '#c084fc',
              mb: 6,
              maxWidth: 700,
              mx: 'auto',
              fontWeight: 300,
              lineHeight: 1.6,
            }}
          >
            Crea invitaciones personalizadas para cada invitado y comparte enlaces únicos
            para que celebren este momento especial contigo
          </Typography>

          {/* Botón de acción */}
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Button
              component={Link}
              href="/admin"
              variant="contained"
              size="large"
              endIcon={<ArrowRightIcon />}
              sx={{
                background: 'linear-gradient(90deg, #9333ea 0%, #ec4899 100%)',
                color: 'white',
                px: 6,
                py: 2,
                fontSize: '1.25rem',
                fontWeight: 600,
                borderRadius: 999,
                boxShadow: '0 20px 40px rgba(147, 51, 234, 0.4)',
                '&:hover': {
                  background: 'linear-gradient(90deg, #7e22ce 0%, #db2777 100%)',
                  transform: 'translateY(-4px)',
                  boxShadow: '0 25px 50px rgba(147, 51, 234, 0.5)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              <UsersIcon sx={{ mr: 1 }} />
              Panel de Administración
            </Button>
          </Box>

          {/* Características */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  textAlign: 'center',
                  p: 3,
                  borderRadius: 3,
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.1)',
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    background: 'rgba(147, 51, 234, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                  }}
                >
                  <GraduationCapIcon sx={{ fontSize: 28, color: '#c084fc' }} />
                </Box>
                <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 1 }}>
                  Invitaciones Únicas
                </Typography>
                <Typography variant="body2" sx={{ color: '#c084fc' }}>
                  Cada invitado recibe un enlace personalizado con su nombre
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  textAlign: 'center',
                  p: 3,
                  borderRadius: 3,
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.1)',
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    background: 'rgba(236, 72, 153, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                  }}
                >
                  <UsersIcon sx={{ fontSize: 28, color: '#f472b6' }} />
                </Box>
                <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 1 }}>
                  Gestión Simple
                </Typography>
                <Typography variant="body2" sx={{ color: '#c084fc' }}>
                  Agrega, edita y elimina invitados fácilmente desde el panel
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  textAlign: 'center',
                  p: 3,
                  borderRadius: 3,
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.1)',
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    background: 'rgba(99, 102, 241, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                  }}
                >
                  <ShareIcon sx={{ fontSize: 28, color: '#818cf8' }} />
                </Box>
                <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, mb: 1 }}>
                  Compartir Fácil
                </Typography>
                <Typography variant="body2" sx={{ color: '#c084fc' }}>
                  Copia el enlace y compártelo por WhatsApp, email o redes sociales
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Paper>

        {/* Footer */}
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="body2" sx={{ color: '#c084fc' }}>
            Hecho con ❤️ para celebrar momentos especiales
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
