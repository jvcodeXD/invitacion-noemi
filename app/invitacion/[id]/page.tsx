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
  Button,
  Stack,
  Divider,
} from '@mui/material';
import {
  School as GraduationCapIcon,
  CalendarMonth as CalendarIcon,
  LocationOn as MapPinIcon,
  AccessTime as ClockIcon,
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
          background: 'linear-gradient(135deg, #7f1d1d 0%, #dc2626 50%, #991b1b 100%)',
        }}
      >
        <Stack alignItems="center" spacing={2}>
          <CircularProgress size={60} sx={{ color: '#fca5a5' }} />
          <Typography variant="h6" sx={{ color: '#fecaca', fontWeight: 300 }}>
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
          background: 'linear-gradient(135deg, #7f1d1d 0%, #dc2626 50%, #991b1b 100%)',
        }}
      >
        <Stack alignItems="center" spacing={2}>
          <GraduationCapIcon sx={{ fontSize: 80, color: '#fca5a5' }} />
          <Typography variant="h4" sx={{ color: '#fef2f2', fontWeight: 300 }}>
            Invitación no encontrada
          </Typography>
          <Typography sx={{ color: '#fecaca' }}>
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
        background: 'linear-gradient(135deg, #7f1d1d 0%, #dc2626 50%, #991b1b 100%)',
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
          {/* Header con logo */}
          <Box
            sx={{
              background: 'linear-gradient(180deg, #dc2626 0%, #991b1b 100%)',
              py: 3,
              px: 2,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                width: { xs: 120, md: 150 },
                height: { xs: 120, md: 150 },
                position: 'relative',
              }}
            >
              <Image
                src="/images/logo-promocion.png"
                alt="Promoción 20-25 Bicentenario"
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </Box>
          </Box>

          {/* Contenido */}
          <Box sx={{ p: { xs: 3, md: 6 } }}>
            {/* Foto de la graduada */}
            <Box
              sx={{
                textAlign: 'center',
                mb: 4,
              }}
            >
              <Box
                sx={{
                  width: { xs: 180, md: 220 },
                  height: { xs: 180, md: 220 },
                  mx: 'auto',
                  mb: 3,
                  position: 'relative',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '6px solid #dc2626',
                  boxShadow: '0 10px 30px rgba(220, 38, 38, 0.3)',
                }}
              >
                <Image
                  src="/images/foto-graduada.png"
                  alt="Noemí Rocha Choque"
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center 0%' }}
                  priority
                />
              </Box>
            </Box>

            {/* Título */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '2rem', md: '3rem' },
                  fontWeight: 700,
                  color: '#7f1d1d',
                  mb: 1,
                }}
              >
                ¡Graduación!
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontSize: { xs: '1.5rem', md: '2rem' },
                  fontWeight: 600,
                  color: '#991b1b',
                  mb: 1,
                }}
              >
                Noemí Rocha Choque
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: '#dc2626',
                  fontWeight: 400,
                  fontStyle: 'italic',
                }}
              >
                Sistemas Informáticos
              </Typography>
              <Divider
                sx={{
                  width: 128,
                  height: 4,
                  mx: 'auto',
                  mt: 2,
                  background: 'linear-gradient(90deg, transparent, #dc2626, transparent)',
                  border: 'none',
                }}
              />
            </Box>

            {/* Escudo del colegio */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography
                variant="body1"
                sx={{
                  color: '#374151',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                }}
              >
                Colegio Nuestra Señora del Socavón
              </Typography>
            </Box>

            {/* Mensaje personal */}
            <Box sx={{ textAlign: 'center', mb: 5 }}>
              <Typography
                variant="h6"
                sx={{ color: '#7f1d1d', fontWeight: 400, mb: 2 }}
              >
                Querido/a{' '}
                <Box
                  component="span"
                  sx={{ fontWeight: 700, color: '#991b1b' }}
                >
                  {guest.nombre} {guest.apellido}
                </Box>
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: '#374151',
                  lineHeight: 1.8,
                  maxWidth: 600,
                  mx: 'auto',
                  fontSize: '1.05rem',
                }}
              >
                Tengo el honor de invitarte a celebrar un momento muy especial en mi vida.
                Tu presencia haría este día aún más memorable.
              </Typography>
            </Box>

            {/* Detalles del evento */}
            <Paper
              elevation={0}
              sx={{
                border: '2px solid',
                borderColor: '#fca5a5',
                borderRadius: 3,
                py: 4,
                px: 2,
                mb: 4,
                background: 'linear-gradient(180deg, #fef2f2 0%, #ffffff 100%)',
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  textAlign: 'center',
                  color: '#7f1d1d',
                  mb: 4,
                  fontWeight: 700,
                }}
              >
                Detalles del Acto de Graduación
              </Typography>

              <Stack spacing={3}>
                <Stack 
                  direction={{ xs: 'column', sm: 'row' }} 
                  alignItems="center" 
                  justifyContent="center" 
                  spacing={2}
                >
                  <CalendarIcon sx={{ color: '#dc2626', fontSize: 32 }} />
                  <Typography variant="body1" sx={{ color: '#374151', fontSize: '1.1rem' }}>
                    <strong>Fecha:</strong> Jueves, 12 de Diciembre 2024
                  </Typography>
                </Stack>

                <Stack 
                  direction={{ xs: 'column', sm: 'row' }} 
                  alignItems="center" 
                  justifyContent="center" 
                  spacing={2}
                >
                  <ClockIcon sx={{ color: '#dc2626', fontSize: 32 }} />
                  <Typography variant="body1" sx={{ color: '#374151', fontSize: '1.1rem' }}>
                    <strong>Hora:</strong> 14:30 (2:30 PM)
                  </Typography>
                </Stack>

                <Stack 
                  direction={{ xs: 'column', sm: 'row' }} 
                  alignItems="center" 
                  justifyContent="center" 
                  spacing={2}
                >
                  <MapPinIcon sx={{ color: '#dc2626', fontSize: 32 }} />
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: '#374151', 
                      fontSize: '1.1rem',
                      textAlign: { xs: 'center', sm: 'left' },
                    }}
                  >
                    <strong>Lugar:</strong> Hall de la Gobernación de Oruro
                  </Typography>
                </Stack>
              </Stack>
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
                  border: '3px solid #dc2626',
                  boxShadow: '0 10px 30px rgba(220, 38, 38, 0.2)',
                }}
              >
                <Image
                  src="/images/foto-grupal.jpeg"
                  alt="Promoción Sistemas Informáticos 2025"
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center 10%' }}
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
                Promoción 20-25 - Sistemas Informáticos
              </Typography>
            </Box>

            {/* Mensaje adicional */}
            {guest.mensaje && (
              <Paper
                elevation={0}
                sx={{
                  background: '#fef2f2',
                  p: 3,
                  borderRadius: 2,
                  mb: 4,
                  border: '1px solid #fecaca',
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ color: '#7f1d1d', fontStyle: 'italic', textAlign: 'center' }}
                >
                  "{guest.mensaje}"
                </Typography>
              </Paper>
            )}

            {/* Confirmación */}
            <Box sx={{ textAlign: 'center' }}>
              <Button
                variant="contained"
                size="large"
                href={`https://wa.me/59171234567?text=Hola Noemí! Confirmo mi asistencia a tu graduación. ${guest.nombre} ${guest.apellido}`}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  background: 'linear-gradient(90deg, #dc2626 0%, #991b1b 100%)',
                  color: 'white',
                  px: 6,
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  borderRadius: 999,
                  boxShadow: '0 10px 25px rgba(220, 38, 38, 0.4)',
                  '&:hover': {
                    background: 'linear-gradient(90deg, #991b1b 0%, #7f1d1d 100%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 15px 30px rgba(220, 38, 38, 0.5)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Confirmar Asistencia
              </Button>
            </Box>

            {/* Nota final */}
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Typography variant="body2" sx={{ color: '#6b7280' }}>
                ¡Espero contar con tu presencia en este día tan especial!
              </Typography>
            </Box>
          </Box>

          {/* Footer decorativo */}
          <Box
            sx={{
              height: 8,
              background: 'linear-gradient(90deg, #dc2626 0%, #991b1b 50%, #dc2626 100%)',
            }}
          />
        </Paper>

        {/* Mensaje al pie */}
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="body2" sx={{ color: '#fecaca', fontWeight: 500 }}>
            Esta invitación es personal e intransferible
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
