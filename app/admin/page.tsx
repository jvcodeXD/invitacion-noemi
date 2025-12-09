'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc,
  query,
  orderBy 
} from 'firebase/firestore';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  Stack,
  IconButton,
  Chip,
  CircularProgress,
  Paper,
  Divider,
  Alert,
} from '@mui/material';
import {
  PersonAdd as UserPlusIcon,
  Delete as DeleteIcon,
  ContentCopy as CopyIcon,
  Check as CheckIcon,
  People as UsersIcon,
  OpenInNew as ExternalLinkIcon,
} from '@mui/icons-material';

interface Guest {
  id: string;
  nombre: string;
  apellido: string;
  mensaje?: string;
  createdAt?: any;
}

export default function AdminPage() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    mensaje: ''
  });
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchGuests();
  }, []);

  const fetchGuests = async () => {
    try {
      const q = query(collection(db, 'invitados'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const guestsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Guest[];
      setGuests(guestsData);
    } catch (error) {
      console.error('Error al cargar invitados:', error);
      alert('Error al cargar invitados. Verifica tu configuración de Firebase.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nombre.trim() || !formData.apellido.trim()) {
      alert('Por favor completa nombre y apellido');
      return;
    }

    setIsSubmitting(true);

    try {
      await addDoc(collection(db, 'invitados'), {
        nombre: formData.nombre.trim(),
        apellido: formData.apellido.trim(),
        mensaje: formData.mensaje.trim() || '',
        createdAt: new Date()
      });

      setFormData({ nombre: '', apellido: '', mensaje: '' });
      await fetchGuests();
      alert('¡Invitado agregado exitosamente!');
    } catch (error) {
      console.error('Error al agregar invitado:', error);
      alert('Error al agregar invitado. Verifica tu configuración de Firebase.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, nombre: string) => {
    if (!confirm(`¿Estás seguro de eliminar a ${nombre}?`)) return;

    try {
      await deleteDoc(doc(db, 'invitados', id));
      await fetchGuests();
    } catch (error) {
      console.error('Error al eliminar invitado:', error);
      alert('Error al eliminar invitado');
    }
  };

  const copyInvitationUrl = (id: string) => {
    const url = `${window.location.origin}/invitacion/${id}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const openInvitation = (id: string) => {
    window.open(`/invitacion/${id}`, '_blank');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1e1b4b 0%, #581c87 50%, #1e1b4b 100%)',
        py: { xs: 4, md: 8 },
        px: 2,
      }}
    >
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h2"
            sx={{
              color: 'white',
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: '2rem', md: '3rem' },
            }}
          >
            Panel de Administración
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: '#c084fc', mb: 3, fontWeight: 300 }}
          >
            Gestiona las invitaciones de graduación
          </Typography>
          <Chip
            icon={<UsersIcon />}
            label={`${guests.length} ${guests.length === 1 ? 'invitado' : 'invitados'} registrados`}
            sx={{
              background: 'rgba(168, 85, 247, 0.2)',
              color: '#c084fc',
              border: '1px solid rgba(168, 85, 247, 0.3)',
              fontSize: '1rem',
              py: 3,
            }}
          />
        </Box>

        <Grid container spacing={4}>
          {/* Formulario */}
          <Grid item xs={12} md={5}>
            <Paper
              elevation={24}
              sx={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 4,
                p: 4,
              }}
            >
              <Stack direction="row" alignItems="center" spacing={2} mb={3}>
                <UserPlusIcon sx={{ fontSize: 32, color: '#c084fc' }} />
                <Typography variant="h5" sx={{ color: 'white', fontWeight: 600 }}>
                  Agregar Invitado
                </Typography>
              </Stack>

              <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  <TextField
                    label="Nombre"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    required
                    fullWidth
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'white',
                        '& fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.2)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(168, 85, 247, 0.5)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#a855f7',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: '#c084fc',
                      },
                    }}
                  />

                  <TextField
                    label="Apellido"
                    value={formData.apellido}
                    onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                    required
                    fullWidth
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'white',
                        '& fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.2)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(168, 85, 247, 0.5)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#a855f7',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: '#c084fc',
                      },
                    }}
                  />

                  <TextField
                    label="Mensaje personalizado (opcional)"
                    value={formData.mensaje}
                    onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                    fullWidth
                    multiline
                    rows={3}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'white',
                        '& fieldset': {
                          borderColor: 'rgba(255, 255, 255, 0.2)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(168, 85, 247, 0.5)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#a855f7',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: '#c084fc',
                      },
                    }}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={isSubmitting}
                    fullWidth
                    sx={{
                      background: 'linear-gradient(90deg, #9333ea 0%, #ec4899 100%)',
                      color: 'white',
                      py: 1.5,
                      fontSize: '1rem',
                      fontWeight: 600,
                      '&:hover': {
                        background: 'linear-gradient(90deg, #7e22ce 0%, #db2777 100%)',
                        transform: 'translateY(-2px)',
                      },
                      '&:disabled': {
                        background: 'rgba(147, 51, 234, 0.3)',
                        color: 'rgba(255, 255, 255, 0.5)',
                      },
                    }}
                  >
                    {isSubmitting ? 'Agregando...' : 'Agregar Invitado'}
                  </Button>
                </Stack>
              </form>
            </Paper>
          </Grid>

          {/* Lista de invitados */}
          <Grid item xs={12} md={7}>
            <Paper
              elevation={24}
              sx={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 4,
                p: 4,
              }}
            >
              <Stack direction="row" alignItems="center" spacing={2} mb={3}>
                <UsersIcon sx={{ fontSize: 32, color: '#c084fc' }} />
                <Typography variant="h5" sx={{ color: 'white', fontWeight: 600 }}>
                  Lista de Invitados
                </Typography>
              </Stack>

              {loading ? (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                  <CircularProgress size={60} sx={{ color: '#a855f7' }} />
                  <Typography sx={{ color: '#c084fc', mt: 2 }}>
                    Cargando invitados...
                  </Typography>
                </Box>
              ) : guests.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                  <UsersIcon sx={{ fontSize: 64, color: 'rgba(168, 85, 247, 0.3)', mb: 2 }} />
                  <Typography sx={{ color: '#c084fc', mb: 1 }}>
                    Aún no hay invitados registrados
                  </Typography>
                  <Typography sx={{ color: 'rgba(192, 132, 252, 0.7)', fontSize: '0.875rem' }}>
                    Agrega tu primer invitado usando el formulario
                  </Typography>
                </Box>
              ) : (
                <Stack
                  spacing={2}
                  sx={{
                    maxHeight: 600,
                    overflowY: 'auto',
                    pr: 1,
                    '&::-webkit-scrollbar': {
                      width: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '10px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      background: 'rgba(168, 85, 247, 0.5)',
                      borderRadius: '10px',
                      '&:hover': {
                        background: 'rgba(168, 85, 247, 0.7)',
                      },
                    },
                  }}
                >
                  {guests.map((guest) => (
                    <Card
                      key={guest.id}
                      sx={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: 2,
                        '&:hover': {
                          background: 'rgba(255, 255, 255, 0.08)',
                        },
                      }}
                    >
                      <CardContent>
                        <Stack direction="row" justifyContent="space-between" alignItems="start">
                          <Box>
                            <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                              {guest.nombre} {guest.apellido}
                            </Typography>
                            {guest.mensaje && (
                              <Typography
                                variant="body2"
                                sx={{ color: '#c084fc', fontStyle: 'italic', mt: 1 }}
                              >
                                "{guest.mensaje}"
                              </Typography>
                            )}
                          </Box>
                          <IconButton
                            onClick={() => handleDelete(guest.id, guest.nombre)}
                            sx={{ color: '#f87171' }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      </CardContent>
                      <CardActions sx={{ px: 2, pb: 2 }}>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={copiedId === guest.id ? <CheckIcon /> : <CopyIcon />}
                          onClick={() => copyInvitationUrl(guest.id)}
                          fullWidth
                          sx={{
                            borderColor: 'rgba(168, 85, 247, 0.5)',
                            color: '#c084fc',
                            '&:hover': {
                              borderColor: '#a855f7',
                              background: 'rgba(168, 85, 247, 0.1)',
                            },
                          }}
                        >
                          {copiedId === guest.id ? '¡Copiado!' : 'Copiar URL'}
                        </Button>
                        <IconButton
                          onClick={() => openInvitation(guest.id)}
                          sx={{
                            color: '#ec4899',
                            '&:hover': {
                              background: 'rgba(236, 72, 153, 0.1)',
                            },
                          }}
                        >
                          <ExternalLinkIcon />
                        </IconButton>
                      </CardActions>
                    </Card>
                  ))}
                </Stack>
              )}
            </Paper>
          </Grid>
        </Grid>

        {/* Instrucciones */}
        <Paper
          elevation={24}
          sx={{
            mt: 6,
            background: 'rgba(147, 51, 234, 0.15)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(147, 51, 234, 0.3)',
            borderRadius: 4,
            p: 4,
          }}
        >
          <Typography variant="h5" sx={{ color: 'white', mb: 3, fontWeight: 600 }}>
            📋 Instrucciones de Uso
          </Typography>
          <Stack spacing={2}>
            <Typography sx={{ color: '#c084fc' }}>
              <strong>1.</strong> Agrega los datos del invitado en el formulario (nombre y apellido son obligatorios)
            </Typography>
            <Typography sx={{ color: '#c084fc' }}>
              <strong>2.</strong> Opcionalmente, puedes agregar un mensaje personalizado para ese invitado
            </Typography>
            <Typography sx={{ color: '#c084fc' }}>
              <strong>3.</strong> Una vez agregado, haz clic en "Copiar URL" para obtener el enlace de su invitación
            </Typography>
            <Typography sx={{ color: '#c084fc' }}>
              <strong>4.</strong> Comparte ese enlace único con el invitado (por WhatsApp, email, etc.)
            </Typography>
            <Typography sx={{ color: '#c084fc' }}>
              <strong>5.</strong> Cada invitado tendrá una invitación personalizada con su nombre
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
