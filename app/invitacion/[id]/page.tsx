'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Image from 'next/image';
import {
  Box,
  Container,
  Typography,
  Paper,
  CircularProgress,
  Stack,
  Divider,
  Link as MuiLink,
} from '@mui/material';
import {
  School as GraduationCapIcon,
  CalendarMonth as CalendarIcon,
  LocationOn as MapPinIcon,
  AccessTime as ClockIcon,
  Celebration as CelebrationIcon,
  DirectionsRun as DirectionsIcon,
} from '@mui/icons-material';

interface Guest {
  id: string;
  nombre: string;
  apellido: string;
  mensaje?: string;
}

export default function InvitacionPage() {
  const params = useParams();
  const guestId = params?.id as string;
  const [guest, setGuest] = useState<Guest | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGuest = async () => {
      if (!guestId) return;
      
      try {
        const docRef = doc(db, 'invitados', guestId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setGuest({ id: docSnap.id, ...docSnap.data() } as Guest);
        }
      } catch (error) {
        console.error('Error al cargar invitado:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGuest();
  }, [guestId]);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #2c1810 0%, #4a1229 50%, #2c1810 100%)',
        }}
      >
        <Stack alignItems="center" spacing={2}>
          <CircularProgress size={60} sx={{ color: '#d4b67a' }} />
          <Typography variant="h6" sx={{ color: '#d4b67a', fontWeight: 300 }}>
            Cargando invitación...
          </Typography>
        </Stack>
      </Box>
    );
  }

  if (!guest) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #2c1810 0%, #4a1229 50%, #2c1810 100%)',
        }}
      >
        <Stack alignItems="center" spacing={2}>
          <GraduationCapIcon sx={{ fontSize: 80, color: '#d4b67a' }} />
          <Typography variant="h4" sx={{ color: '#f5f3f0', fontWeight: 300 }}>
            Invitación no encontrada
          </Typography>
          <Typography sx={{ color: '#d4b67a' }}>
            Por favor, verifica el enlace de tu invitación.
          </Typography>
        </Stack>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #2c1810 0%, #4a1229 50%, #2c1810 100%)',
        py: { xs: 4, md: 6 },
        px: 2,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={24}
          sx={{
            borderRadius: 4,
            overflow: 'hidden',
            background: '#f5efe6', // Fondo beige/crema en lugar de blanco
            animation: 'fadeInUp 0.8s ease-out',
            '@keyframes fadeInUp': {
              from: {
                opacity: 0,
                transform: 'translateY(30px)',
              },
              to: {
                opacity: 1,
                transform: 'translateY(0)',
              },
            },
          }}
        >
          {/* Header decorativo con degradado - SIN logo */}
          <Box
            sx={{
              background: 'linear-gradient(180deg, #6b1b3d 0%, #4a1229 100%)',
              py: 2,
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, #c9a961 0%, #d4b67a 50%, #c9a961 100%)',
              },
            }}
          />

          {/* Contenido */}
          <Box sx={{ p: { xs: 3, md: 6 } }}>
            {/* Promoción 2025 como texto decorativo */}
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Typography
                variant="h6"
                sx={{
                  color: '#6b1b3d',
                  fontWeight: 700,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  fontSize: { xs: '0.9rem', md: '1rem' },
                }}
              >
                Promoción 2025
              </Typography>
              <Box
                sx={{
                  width: 60,
                  height: 2,
                  background: '#c9a961',
                  mx: 'auto',
                  mt: 1,
                }}
              />
            </Box>

            {/* Foto de la graduada */}
            <Box
              sx={{
                textAlign: 'center',
                mb: 4,
              }}
            >
              <Box
                sx={{
                  width: { xs: 200, md: 240 },
                  height: { xs: 200, md: 240 },
                  mx: 'auto',
                  mb: 3,
                  position: 'relative',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '6px solid #6b1b3d',
                  boxShadow: '0 10px 30px rgba(107, 27, 61, 0.4)',
                }}
              >
                <Image
                  src="/images/foto-graduada.png"
                  alt="Noemí Rocha Choque"
                  fill
                  style={{ 
                    objectFit: 'cover',
                    objectPosition: 'center 0%',
                  }}
                  priority
                />
              </Box>
            </Box>

            {/* Título con nombre destacado */}
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontWeight: 700,
                  color: '#4a1229',
                  mb: 2,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                }}
              >
                ¡Graduación!
              </Typography>
              
              {/* Nombre de Noemí MÁS GRANDE Y DESTACADO */}
              <Box
                sx={{
                  background: 'linear-gradient(135deg, #6b1b3d 0%, #8b2350 100%)',
                  borderRadius: 3,
                  py: 3,
                  px: 2,
                  mb: 2,
                  boxShadow: '0 8px 20px rgba(107, 27, 61, 0.3)',
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: { xs: '2rem', md: '2.8rem' },
                    fontWeight: 800,
                    color: 'white',
                    letterSpacing: '0.5px',
                  }}
                >
                  Noemí Rocha Choque
                </Typography>
              </Box>

              {/* Carrera con color de la imagen */}
              <Typography
                variant="h5"
                sx={{
                  color: '#2563eb', // Azul similar al de la imagen
                  fontWeight: 700,
                  fontSize: { xs: '1.3rem', md: '1.6rem' },
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  mb: 1,
                }}
              >
                Sistemas Informáticos
              </Typography>

              {/* Nombre del colegio más grande */}
              <Typography
                variant="h6"
                sx={{
                  color: '#4a1229',
                  fontWeight: 600,
                  fontSize: { xs: '1.2rem', md: '1.4rem' },
                  mt: 2,
                }}
              >
                Colegio Nuestra Señora del Socavón
              </Typography>

              <Divider
                sx={{
                  width: 128,
                  height: 3,
                  mx: 'auto',
                  mt: 3,
                  background: 'linear-gradient(90deg, transparent, #c9a961, transparent)',
                  border: 'none',
                }}
              />
            </Box>

            {/* Mensaje personal familiar */}
            <Box sx={{ textAlign: 'center', mb: 5, mt: 5 }}>
              <Typography
                variant="h6"
                sx={{ color: '#4a1229', fontWeight: 400, mb: 2 }}
              >
                Querido/a{' '}
                <Box
                  component="span"
                  sx={{ fontWeight: 900, color: '#6b1b3d' }}
                >
                  {guest.nombre} {guest.apellido}
                </Box>
              </Typography>
              
              <Paper
                elevation={0}
                sx={{
                  background: 'linear-gradient(135deg, #faf8f3 0%, #ffffff 100%)',
                  p: 4,
                  borderRadius: 3,
                  border: '2px solid #d4b67a',
                  maxWidth: 700,
                  mx: 'auto',
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: '#2c2421',
                    lineHeight: 2,
                    fontSize: { xs: '1.05rem', md: '1.15rem' },
                    fontWeight: 400,
                  }}
                >
                  Te invitamos a la graduación de nuestra hija{' '}
                  <Box
                    component="span"
                    sx={{
                      fontWeight: 800,
                      color: '#6b1b3d',
                      fontSize: '1.2em',
                    }}
                  >
                    Noemí
                  </Box>
                  {' '}que se llevará a cabo en el Hall de la Gobernación.
                </Typography>
                
                <Divider sx={{ my: 2, borderColor: '#d4b67a' }} />
                
                <Typography
                  variant="body1"
                  sx={{
                    color: '#2c2421',
                    lineHeight: 2,
                    fontSize: { xs: '1.05rem', md: '1.15rem' },
                    fontWeight: 400,
                  }}
                >
                  Pasado el acto, les invitamos a compartir con la familia en un festejo especial.
                </Typography>
              </Paper>
            </Box>

            {/* Detalles del ACTO DE GRADUACIÓN */}
            <Paper
              elevation={0}
              sx={{
                border: '2px solid',
                borderColor: '#c9a961',
                borderRadius: 3,
                py: 4,
                px: 3,
                mb: 3,
                background: 'linear-gradient(180deg, #faf8f3 0%, #ffffff 100%)',
              }}
            >
              <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} mb={3}>
                <GraduationCapIcon sx={{ color: '#6b1b3d', fontSize: 32 }} />
                <Typography
                  variant="h5"
                  sx={{
                    textAlign: 'center',
                    color: '#4a1229',
                    fontWeight: 700,
                  }}
                >
                  Acto de Graduación
                </Typography>
              </Stack>

              <Stack spacing={3}>
                <Stack 
                  direction={{ xs: 'column', sm: 'row' }} 
                  alignItems="center" 
                  justifyContent="center" 
                  spacing={2}
                >
                  <CalendarIcon sx={{ color: '#6b1b3d', fontSize: 28 }} />
                  <Typography variant="body1" sx={{ color: '#2c2421', fontSize: '1.05rem', fontWeight: 500 }}>
                    <strong>Fecha:</strong> Jueves, 12 de Diciembre 2024
                  </Typography>
                </Stack>

                <Stack 
                  direction={{ xs: 'column', sm: 'row' }} 
                  alignItems="center" 
                  justifyContent="center" 
                  spacing={2}
                >
                  <ClockIcon sx={{ color: '#6b1b3d', fontSize: 28 }} />
                  <Typography variant="body1" sx={{ color: '#2c2421', fontSize: '1.05rem', fontWeight: 500 }}>
                    <strong>Hora:</strong> 14:30 (2:30 PM)
                  </Typography>
                </Stack>

                <Stack 
                  direction={{ xs: 'column', sm: 'row' }} 
                  alignItems="center" 
                  justifyContent="center" 
                  spacing={2}
                >
                  <MapPinIcon sx={{ color: '#6b1b3d', fontSize: 28 }} />
                  <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: '#2c2421', 
                        fontSize: '1.05rem',
                        fontWeight: 500,
                      }}
                    >
                      <strong>Lugar:</strong> Hall de la Gobernación de Oruro
                    </Typography>
                    <MuiLink
                      href="https://maps.app.goo.gl/HkP1VJRQRa5S7sQL7"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 0.5,
                        color: '#2563eb',
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        mt: 0.5,
                        '&:hover': {
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      <DirectionsIcon sx={{ fontSize: 18 }} />
                      Ver en Google Maps
                    </MuiLink>
                  </Box>
                </Stack>
              </Stack>
            </Paper>

            {/* Detalles del FESTEJO */}
            <Paper
              elevation={0}
              sx={{
                border: '2px solid',
                borderColor: '#d4b67a',
                borderRadius: 3,
                py: 4,
                px: 3,
                mb: 4,
                background: 'linear-gradient(180deg, #fffbf5 0%, #ffffff 100%)',
              }}
            >
              <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} mb={3}>
                <CelebrationIcon sx={{ color: '#c9a961', fontSize: 32 }} />
                <Typography
                  variant="h5"
                  sx={{
                    textAlign: 'center',
                    color: '#6b1b3d',
                    fontWeight: 700,
                  }}
                >
                  Festejo con la Familia
                </Typography>
              </Stack>

              <Stack spacing={3}>
                <Stack 
                  direction={{ xs: 'column', sm: 'row' }} 
                  alignItems="center" 
                  justifyContent="center" 
                  spacing={2}
                >
                  <CalendarIcon sx={{ color: '#c9a961', fontSize: 28 }} />
                  <Typography variant="body1" sx={{ color: '#2c2421', fontSize: '1.05rem', fontWeight: 500 }}>
                    <strong>Cuándo:</strong> Después del acto de graduación
                  </Typography>
                </Stack>

                <Stack 
                  direction={{ xs: 'column', sm: 'row' }} 
                  alignItems="center" 
                  justifyContent="center" 
                  spacing={2}
                >
                  <MapPinIcon sx={{ color: '#c9a961', fontSize: 28 }} />
                  <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: '#2c2421', 
                        fontSize: '1.05rem',
                        fontWeight: 500,
                      }}
                    >
                      <strong>Lugar:</strong> Pagador entre San Felipe y Arce N° 6660
                    </Typography>
                    <MuiLink
                      href="https://www.google.com/maps/search/?api=1&query=Pagador+entre+San+Felipe+y+Arce+6660+Oruro"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 0.5,
                        color: '#2563eb',
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        mt: 0.5,
                        '&:hover': {
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      <DirectionsIcon sx={{ fontSize: 18 }} />
                      Ver en Google Maps
                    </MuiLink>
                  </Box>
                </Stack>
              </Stack>

              <Box sx={{ textAlign: 'center', mt: 3, p: 2, bgcolor: '#fffbf5', borderRadius: 2 }}>
                <Typography variant="body1" sx={{ color: '#8b2350', fontStyle: 'italic', fontWeight: 500 }}>
                  ¡Será un honor compartir este momento especial contigo! 🎉
                </Typography>
              </Box>
            </Paper>

            {/* Foto grupal */}
            <Box sx={{ mb: 4 }}>
              <Box
                sx={{
                  width: '100%',
                  height: { xs: 200, sm: 300, md: 350 },
                  position: 'relative',
                  borderRadius: 3,
                  overflow: 'hidden',
                  border: '4px solid #6b1b3d',
                  boxShadow: '0 10px 30px rgba(107, 27, 61, 0.3)',
                }}
              >
                <Image
                  src="/images/foto-grupal.jpeg"
                  alt="Promoción Sistemas Informáticos 2025"
                  fill
                  style={{ 
                    objectFit: 'cover',
                    objectPosition: 'center 10%',
                  }}
                />
              </Box>
              <Typography
                variant="caption"
                sx={{
                  display: 'block',
                  textAlign: 'center',
                  mt: 1,
                  color: '#6b7280',
                  fontStyle: 'italic',
                }}
              >
                Promoción 2025 - Sistemas Informáticos
              </Typography>
            </Box>

            {/* Mensaje adicional */}
            {guest.mensaje && (
              <Paper
                elevation={0}
                sx={{
                  background: '#faf8f3',
                  p: 3,
                  borderRadius: 2,
                  mb: 4,
                  border: '1px solid #d4b67a',
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ color: '#4a1229', fontStyle: 'italic', textAlign: 'center' }}
                >
                  "{guest.mensaje}"
                </Typography>
              </Paper>
            )}

            {/* Nota final */}
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Typography variant="body2" sx={{ color: '#6b7280' }}>
                ¡Tu presencia hará este día aún más especial!
              </Typography>
            </Box>
          </Box>

          {/* Footer decorativo */}
          <Box
            sx={{
              height: 8,
              background: 'linear-gradient(90deg, #6b1b3d 0%, #c9a961 50%, #6b1b3d 100%)',
            }}
          />
        </Paper>

        {/* Mensaje al pie */}
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="body2" sx={{ color: '#d4b67a', fontWeight: 500 }}>
            Esta invitación es personal e intransferible
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
