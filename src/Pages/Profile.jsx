import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Container, Typography, Avatar, Paper, Grid, Divider, List, ListItem, ListItemIcon, ListItemText, CircularProgress, Stack, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import { Email as EmailIcon, Phone as PhoneIcon, Home as HomeIcon, Work as WorkIcon, Edit as EditIcon, LockReset as LockResetIcon } from "@mui/icons-material";
import { styled } from "@mui/system";
import { FetchUserProfile, UpdateUserProfile } from "../redux/actions/userActions";
import { ButtonComponent } from "../Components/Global/ButtonComponent";
import { useTranslation } from "react-i18next";

const ProfileContainer = styled(Box)({ padding: "40px 0", display: "flex", alignItems: "center", minHeight: "600px" });
const ProfilePaper = styled(Paper)({ padding: "56px 60px", borderRadius: "38px", maxWidth: "900px", margin: "0 auto" });
const UserAvatar = styled(Avatar)({ width: 150, height: 150 });

const Profile = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { CurrentUser, loading, error, errorMessage } = useSelector((state) => state.user);

  const [openEdit, setOpenEdit] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", email: "", phone: "", address: "", domain: "" });

  useEffect(() => {
    if (!CurrentUser) dispatch(FetchUserProfile());
    else setFormData({
      fullName: CurrentUser.fullName || "",
      email: CurrentUser.email || "",
      phone: CurrentUser.phone || "",
      address: CurrentUser.address || "",
      domain: CurrentUser.domain || "",
    });
  }, [dispatch, CurrentUser]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

const handleSave = () => {
  dispatch(UpdateUserProfile({ id: CurrentUser.id, userData: formData }))
    .unwrap()
    .then(() => {
      setOpenEdit(false);
      dispatch(FetchUserProfile()); // recharger les infos
    })
    .catch((err) => console.error(err));
};


  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{errorMessage}</Typography>;

  return (
    <ProfileContainer>
      <Container>
        <ProfilePaper elevation={5}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
              <UserAvatar src="" alt={CurrentUser?.username || ""} sx={{ mb: 2 }} />
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>{CurrentUser?.fullName || CurrentUser?.username}</Typography>
              <Typography variant="subtitle1" color="text.secondary">{CurrentUser?.role || "Utilisateur"}</Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h6">{t("Informations Personnelles")}</Typography>
              <Divider sx={{ mb: 2 }} />
              <List>
                {[{ icon: <EmailIcon />, label: t("Email"), value: CurrentUser?.email }, { icon: <PhoneIcon />, label: t("Téléphone"), value: CurrentUser?.phone }, { icon: <HomeIcon />, label: t("Adresse"), value: CurrentUser?.address }, { icon: <WorkIcon />, label: t("Domaine"), value: CurrentUser?.domain }].map((item, i) => (
                  <ListItem key={i}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.label} secondary={item.value || "Non renseigné"} />
                  </ListItem>
                ))}
              </List>
              <Divider sx={{ my: 3 }} />
              <Stack direction="row" spacing={2}>
                <ButtonComponent color="#008000" text={t("Modifier Profil")} icon={<EditIcon />} onClick={() => setOpenEdit(true)} />
              </Stack>
            </Grid>
          </Grid>
        </ProfilePaper>

        {/* Modal modification */}
        <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
          <DialogTitle>{t("Modifier Profil")}</DialogTitle>
          <DialogContent>
            {["fullName", "email", "phone", "address", "domain"].map((field) => (
              <TextField key={field} margin="dense" label={t(field)} name={field} value={formData[field]} onChange={handleChange} fullWidth />
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenEdit(false)}>Annuler</Button>
            <Button onClick={handleSave} variant="contained" color="primary">Enregistrer</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </ProfileContainer>
  );
};

export default Profile;
