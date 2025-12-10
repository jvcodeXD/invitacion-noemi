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
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
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
  
  // Snackbar states
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'warning' | 'info',
  });

  // Dialog states
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    guestId: '',
    guestName: '',
  });

  const [validationDialog, setValidationDialog] = useState({
    open: false,
    message: '',
  });

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
      setSnackbar({
        open: true,
        message: 'Error al cargar invitados. Verifica tu configuración de Firebase.',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nombre.trim() || !formData.apellido.trim()) {
      setValidationDialog({
        open: true,
        message: 'Por favor completa nombre y apellido',
      });
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
      
      setSnackbar({
        open: true,
        message: `¡${formData.nombre} ${formData.apellido} agregado exitosamente!`,
        severity: 'success',
      });
    } catch (error) {
      console.error('Error al agregar invitado:', error);
      setSnackbar({
        open: true,
        message: 'Error al agregar invitado. Verifica tu configuración de Firebase.',
        severity: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClick = (id: string, nombre: string, apellido: string) => {
    setDeleteDialog({
      open: true,
      guestId: id,
      guestName: `${nombre} ${apellido}`,
    });
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteDoc(doc(db, 'invitados', deleteDialog.guestId));
      await fetchGuests();
      
      setSnackbar({
        open: true,
        message: `${deleteDialog.guestName} eliminado correctamente`,
        severity: 'info',
      });
    } catch (error) {
      console.error('Error al eliminar invitado:', error);
      setSnackbar({
        open: true,
        message: 'Error al eliminar invitado',
        severity: 'error',
      });
    } finally {
      setDeleteDialog({ open: false, guestId: '', guestName: '' });
    }
  };

  const copyInvitationUrl = (id: string, nombre: string, apellido: string) => {
    const url = `${window.location.origin}/invitacion/${id}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    
    setSnackbar({
      open: true,
      message: `URL copiada para ${nombre} ${apellido}`,
      severity: 'success',
    });
    
    setTimeout(() => setCopiedId(null), 2000);
  };

  const openInvitation = (id: string) => {
    window.open(`/invitacion/${id}`, '_blank');
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #2c1810 0%, #4a1229 50%, #2c1810 100%)',
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
            sx={{ color: '#d4b67a', mb: 3, fontWeight: 300 }}
          >
            Gestiona las invitaciones de graduación
          </Typography>
          <Chip
            icon={<UsersIcon />}
            label={`${guests.length} ${guests.length === 1 ? 'invitado' : 'invitados'} registrados`}
            sx={{
              background: 'rgba(201, 169, 97, 0.2)',
              color: '#d4b67a',
              border: '1px solid rgba(201, 169, 97, 0.3)',
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
                <UserPlusIcon sx={{ fontSize: 32, color: '#d4b67a' }} />
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
                          borderColor: 'rgba(201, 169, 97, 0.5)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#d4b67a',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: '#d4b67a',
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
                          borderColor: 'rgba(201, 169, 97, 0.5)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#d4b67a',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: '#d4b67a',
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
                          borderColor: 'rgba(201, 169, 97, 0.5)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#d4b67a',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: '#d4b67a',
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
                      background: 'linear-gradient(90deg, #6b1b3d 0%, #8b2350 100%)',
                      color: 'white',
                      py: 1.5,
                      fontSize: '1rem',
                      fontWeight: 600,
                      '&:hover': {
                        background: 'linear-gradient(90deg, #4a1229 0%, #6b1b3d 100%)',
                        transform: 'translateY(-2px)',
                      },
                      '&:disabled': {
                        background: 'rgba(107, 27, 61, 0.3)',
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
                <UsersIcon sx={{ fontSize: 32, color: '#d4b67a' }} />
                <Typography variant="h5" sx={{ color: 'white', fontWeight: 600 }}>
                  Lista de Invitados
                </Typography>
              </Stack>

              {loading ? (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                  <CircularProgress size={60} sx={{ color: '#d4b67a' }} />
                  <Typography sx={{ color: '#d4b67a', mt: 2 }}>
                    Cargando invitados...
                  </Typography>
                </Box>
              ) : guests.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                  <UsersIcon sx={{ fontSize: 64, color: 'rgba(212, 182, 122, 0.3)', mb: 2 }} />
                  <Typography sx={{ color: '#d4b67a', mb: 1 }}>
                    Aún no hay invitados registrados
                  </Typography>
                  <Typography sx={{ color: 'rgba(212, 182, 122, 0.7)', fontSize: '0.875rem' }}>
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
                      background: 'rgba(201, 169, 97, 0.5)',
                      borderRadius: '10px',
                      '&:hover': {
                        background: 'rgba(201, 169, 97, 0.7)',
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
                                sx={{ color: '#d4b67a', fontStyle: 'italic', mt: 1 }}
                              >
                                "{guest.mensaje}"
                              </Typography>
                            )}
                          </Box>
                          <IconButton
                            onClick={() => handleDeleteClick(guest.id, guest.nombre, guest.apellido)}
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
                          onClick={() => copyInvitationUrl(guest.id, guest.nombre, guest.apellido)}
                          fullWidth
                          sx={{
                            borderColor: 'rgba(201, 169, 97, 0.5)',
                            color: '#d4b67a',
                            '&:hover': {
                              borderColor: '#d4b67a',
                              background: 'rgba(201, 169, 97, 0.1)',
                            },
                          }}
                        >
                          {copiedId === guest.id ? '¡Copiado!' : 'Copiar URL'}
                        </Button>
                        <IconButton
                          onClick={() => openInvitation(guest.id)}
                          sx={{
                            color: '#d4b67a',
                            '&:hover': {
                              background: 'rgba(201, 169, 97, 0.1)',
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
            background: 'rgba(107, 27, 61, 0.15)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(107, 27, 61, 0.3)',
            borderRadius: 4,
            p: 4,
          }}
        >
          <Typography variant="h5" sx={{ color: 'white', mb: 3, fontWeight: 600 }}>
            📋 Instrucciones de Uso
          </Typography>
          <Stack spacing={2}>
            <Typography sx={{ color: '#d4b67a' }}>
              <strong>1.</strong> Agrega los datos del invitado en el formulario (nombre y apellido son obligatorios)
            </Typography>
            <Typography sx={{ color: '#d4b67a' }}>
              <strong>2.</strong> Opcionalmente, puedes agregar un mensaje personalizado para ese invitado
            </Typography>
            <Typography sx={{ color: '#d4b67a' }}>
              <strong>3.</strong> Una vez agregado, haz clic en "Copiar URL" para obtener el enlace de su invitación
            </Typography>
            <Typography sx={{ color: '#d4b67a' }}>
              <strong>4.</strong> Comparte ese enlace único con el invitado (por WhatsApp, email, etc.)
            </Typography>
            <Typography sx={{ color: '#d4b67a' }}>
              <strong>5.</strong> Cada invitado tendrá una invitación personalizada con su nombre
            </Typography>
          </Stack>
        </Paper>
      </Container>

      {/* Snackbar para notificaciones */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Dialog de confirmación de eliminación */}
      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, guestId: '', guestName: '' })}
        PaperProps={{
          sx: {
            background: 'linear-gradient(135deg, #2c1810 0%, #4a1229 100%)',
            border: '1px solid rgba(201, 169, 97, 0.3)',
          },
        }}
      >
        <DialogTitle sx={{ color: 'white' }}>
          Confirmar Eliminación
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: '#d4b67a' }}>
            ¿Estás seguro de que deseas eliminar a <strong>{deleteDialog.guestName}</strong>?
            Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteDialog({ open: false, guestId: '', guestName: '' })}
            sx={{ color: '#d4b67a' }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="contained"
            sx={{
              background: '#dc2626',
              '&:hover': {
                background: '#991b1b',
              },
            }}
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog de validación */}
      <Dialog
        open={validationDialog.open}
        onClose={() => setValidationDialog({ open: false, message: '' })}
        PaperProps={{
          sx: {
            background: 'linear-gradient(135deg, #2c1810 0%, #4a1229 100%)',
            border: '1px solid rgba(201, 169, 97, 0.3)',
          },
        }}
      >
        <DialogTitle sx={{ color: 'white' }}>
          Campos Requeridos
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: '#d4b67a' }}>
            {validationDialog.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setValidationDialog({ open: false, message: '' })}
            sx={{ color: '#d4b67a' }}
          >
            Entendido
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
