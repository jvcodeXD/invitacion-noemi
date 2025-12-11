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

const BACKGROUND_IMAGES = [
  '/images/bg-1.jpeg',
  '/images/bg-2.jpeg',
  '/images/bg-3.jpeg',
];

export default function InvitacionPage() {
  const params = useParams();
  const guestId = params?.id as string;
  const [guest, setGuest] = useState<Guest | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Detectar si es invitación general
  const isGeneralInvitation = guestId === 'general';

  // Slideshow automático
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % BACKGROUND_IMAGES.length
      );
    }, 5000); // Cambia cada 5 segundos

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchGuest = async () => {
      if (!guestId) return;
      
      // Si es invitación general, crear un guest genérico
      if (guestId === 'general') {
        setGuest({
          id: 'general',
          nombre: '',
          apellido: '',
          mensaje: '',
        });
        setLoading(false);
        return;
      }
      
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
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Slideshow de fondo */}
      {BACKGROUND_IMAGES.map((image, index) => (
        <Box
          key={image}
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: currentImageIndex === index ? 1 : 0,
            transition: 'opacity 2s ease-in-out',
            zIndex: 0,
          }}
        >
          <Image
            src={image}
            alt={`Fondo ${index + 1}`}
            fill
            style={{ objectFit: 'cover' }}
            priority={index === 0}
          />
        </Box>
      ))}

      {/* Overlay oscuro - MÁS TRANSPARENTE para ver mejor las imágenes */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(44, 24, 16, 0.50) 0%, rgba(74, 18, 41, 0.50) 50%, rgba(44, 24, 16, 0.50) 100%)',
          zIndex: 1,
        }}
      />

      {/* Contenido */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          minHeight: '100vh',
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
              background: 'rgba(25, 20, 18, 0.85)', // Fondo más oscuro
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(201, 169, 97, 0.4)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.7)',
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
            {/* Header decorativo */}
            <Box
              sx={{
                background: 'linear-gradient(180deg, rgba(107, 27, 61, 0.95) 0%, rgba(74, 18, 41, 0.95) 100%)',
                py: 2,
                position: 'relative',
                backdropFilter: 'blur(5px)',
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
                    color: '#d4b67a',
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
                    color: '#f5f3f0',
                    mb: 2,
                    textShadow: '2px 2px 8px rgba(0,0,0,0.5)',
                  }}
                >
                  ¡Graduación!
                </Typography>
                
{/* Nombre de Noemí - Texto con efecto dorado brillante */}
<Box
  sx={{
    textAlign: 'center',
    mb: 3,
  }}
>
  {/* Decoración superior */}
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 2,
      mb: 3,
    }}
  >
    <Box sx={{ 
      width: { xs: 60, md: 100 }, 
      height: 3, 
      background: 'linear-gradient(90deg, transparent, #f5d45e)',
      boxShadow: '0 0 10px rgba(245, 212, 94, 0.6)',
    }} />
    <Box sx={{ 
      width: 12, 
      height: 12, 
      borderRadius: '50%', 
      background: '#f5d45e',
      boxShadow: '0 0 20px rgba(245, 212, 94, 1), 0 0 10px rgba(245, 212, 94, 0.8)',
    }} />
    <Box sx={{ 
      width: { xs: 60, md: 100 }, 
      height: 3, 
      background: 'linear-gradient(90deg, #f5d45e, transparent)',
      boxShadow: '0 0 10px rgba(245, 212, 94, 0.6)',
    }} />
  </Box>

  {/* Nombre con efecto dorado brillante */}
  <Typography
    sx={{
      fontFamily: "'Great Vibes', 'Allura', 'Alex Brush', cursive",
      fontSize: { xs: '2.5rem', md: '4rem' },
      fontWeight: 400,
      color: '#d4af37',
      textShadow: `
        0 0 40px rgba(255, 215, 0, 0.8),
        0 0 30px rgba(255, 215, 0, 0.6),
        0 0 20px rgba(212, 175, 55, 0.8),
        0 2px 4px rgba(0, 0, 0, 0.5)
      `,
      letterSpacing: '2px',
      mb: 2,
      filter: 'brightness(1.2)',
    }}
  >
    Noemí Sarai Rocha Choque
  </Typography>

  {/* Decoración inferior */}
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 2,
      mt: 3,
    }}
  >
    <Box sx={{ 
      width: { xs: 60, md: 100 }, 
      height: 3, 
      background: 'linear-gradient(90deg, transparent, #f5d45e)',
      boxShadow: '0 0 10px rgba(245, 212, 94, 0.6)',
    }} />
    <Box sx={{ 
      width: 12, 
      height: 12, 
      borderRadius: '50%', 
      background: '#f5d45e',
      boxShadow: '0 0 20px rgba(245, 212, 94, 1), 0 0 10px rgba(245, 212, 94, 0.8)',
    }} />
    <Box sx={{ 
      width: { xs: 60, md: 100 }, 
      height: 3, 
      background: 'linear-gradient(90deg, #f5d45e, transparent)',
      boxShadow: '0 0 10px rgba(245, 212, 94, 0.6)',
    }} />
  </Box>
</Box>

                {/* Carrera con color de la imagen */}
                <Typography
                  variant="h5"
                  sx={{
                    color: '#2563eb',
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
                    color: '#d4b67a',
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
                {!isGeneralInvitation ? (
                  <Typography
                    variant="h6"
                    sx={{ color: '#f5f3f0', fontWeight: 400, mb: 2 }}
                  >
                    Querido/a{' '}
                    <Box
                      component="span"
                      sx={{ fontWeight: 700, color: '#d4b67a' }}
                    >
                      {guest.nombre} {guest.apellido}
                    </Box>
                  </Typography>
                ) : (
                  <Typography
                    variant="h5"
                    sx={{ 
                      color: '#d4b67a', 
                      fontWeight: 600, 
                      mb: 2,
                      fontSize: { xs: '1.5rem', md: '1.8rem' },
                      letterSpacing: '1px',
                    }}
                  >
                    Querida Familia y Amigos
                  </Typography>
                )}
                
                <Paper
                  elevation={0}
                  sx={{
                    background: 'rgba(35, 28, 25, 0.85)',
                    backdropFilter: 'blur(10px)',
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
                      color: '#f5f3f0',
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
                        color: '#d4b67a',
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
                      color: '#f5f3f0',
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
                  background: 'rgba(35, 28, 25, 0.85)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} mb={3}>
                  <GraduationCapIcon sx={{ color: '#d4b67a', fontSize: 32 }} />
                  <Typography
                    variant="h5"
                    sx={{
                      textAlign: 'center',
                      color: '#f5f3f0',
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
                    <CalendarIcon sx={{ color: '#d4b67a', fontSize: 28 }} />
                    <Typography variant="body1" sx={{ color: '#f5f3f0', fontSize: '1.05rem', fontWeight: 500 }}>
                      <strong>Fecha:</strong> Viernes, 12 de Diciembre 2024
                    </Typography>
                  </Stack>

                  <Stack 
                    direction={{ xs: 'column', sm: 'row' }} 
                    alignItems="center" 
                    justifyContent="center" 
                    spacing={2}
                  >
                    <ClockIcon sx={{ color: '#d4b67a', fontSize: 28 }} />
                    <Typography variant="body1" sx={{ color: '#f5f3f0', fontSize: '1.05rem', fontWeight: 500 }}>
                      <strong>Hora:</strong> 14:30 (2:30 PM)
                    </Typography>
                  </Stack>

                  <Stack 
                    direction={{ xs: 'column', sm: 'row' }} 
                    alignItems="center" 
                    justifyContent="center" 
                    spacing={2}
                  >
                    <MapPinIcon sx={{ color: '#d4b67a', fontSize: 28 }} />
                    <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          color: '#f5f3f0', 
                          fontSize: '1.05rem',
                          fontWeight: 500,
                        }}
                      >
                        <strong>Lugar:</strong> Hall de la Gobernación de Oruro
                      </Typography>
                      <MuiLink
                        href="https://www.google.com/maps?q=-17.969526,-67.115231"
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
                  background: 'rgba(35, 28, 25, 0.85)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} mb={3}>
                  <CelebrationIcon sx={{ color: '#d4b67a', fontSize: 32 }} />
                  <Typography
                    variant="h5"
                    sx={{
                      textAlign: 'center',
                      color: '#f5f3f0',
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
                    <CalendarIcon sx={{ color: '#d4b67a', fontSize: 28 }} />
                    <Typography variant="body1" sx={{ color: '#f5f3f0', fontSize: '1.05rem', fontWeight: 500 }}>
                      <strong>Cuándo:</strong> Después del acto de graduación
                    </Typography>
                  </Stack>

                  <Stack 
                    direction={{ xs: 'column', sm: 'row' }} 
                    alignItems="center" 
                    justifyContent="center" 
                    spacing={2}
                  >
                    <MapPinIcon sx={{ color: '#d4b67a', fontSize: 28 }} />
                    <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          color: '#f5f3f0', 
                          fontSize: '1.05rem',
                          fontWeight: 500,
                        }}
                      >
                        <strong>Lugar:</strong> Pagador entre San Felipe y Arce N° 6660
                      </Typography>
                      <MuiLink
                        href="https://www.google.com/maps?q=-17.975803,-67.111898"
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

                <Box sx={{ textAlign: 'center', mt: 3, p: 2, bgcolor: 'rgba(201, 169, 97, 0.2)', borderRadius: 2 }}>
                  <Typography variant="body1" sx={{ color: '#d4b67a', fontStyle: 'italic', fontWeight: 500 }}>
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

              {/* Mensaje adicional - Solo para invitaciones personales */}
              {!isGeneralInvitation && guest.mensaje && (
                <Paper
                  elevation={0}
                  sx={{
                    background: 'rgba(35, 28, 25, 0.85)',
                    backdropFilter: 'blur(10px)',
                    p: 3,
                    borderRadius: 2,
                    mb: 4,
                    border: '1px solid #d4b67a',
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{ color: '#d4b67a', fontStyle: 'italic', textAlign: 'center' }}
                  >
                    "{guest.mensaje}"
                  </Typography>
                </Paper>
              )}

              {/* Nota final */}
              <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Typography variant="body2" sx={{ color: '#d4b67a' }}>
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
    </Box>
  );
}
