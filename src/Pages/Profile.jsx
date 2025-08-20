import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Container, Typography, Avatar, Paper, Grid, Divider, List, ListItem, ListItemIcon, ListItemText, CircularProgress, Stack } from "@mui/material";
import { Email as EmailIcon, Phone as PhoneIcon, Home as HomeIcon, Work as WorkIcon, Edit as EditIcon, LockReset as LockResetIcon } from "@mui/icons-material";
import { styled } from "@mui/system";
import { FetchUserProfile } from "../redux/actions/userActions";
import { ButtonComponent } from "../Components/Global/ButtonComponent";
import { useTranslation } from "react-i18next";

const ProfileContainer = styled(Box)({
  backgroundColor: "#F3FAFF",
  padding: "40px 0",
  display: "flex",
  alignItems: "center",
  minHeight: "600px",
});

const ProfilePaper = styled(Paper)({
  padding: "56px 60px",
  borderRadius: "38px",
  backgroundColor: "rgba(255, 255, 255, 0.97)",
  boxShadow: "0 16px 48px rgba(25, 118, 210, 0.12)",
  maxWidth: "1250px",
  minWidth: "1050px",
  width: "100%",
  margin: "0 auto",
  transition: "box-shadow 0.2s",
  "@media (max-width:1100px)": {
    maxWidth: "99vw",
    minWidth: "unset",
    padding: "32px 8px",
    borderRadius: "16px",
  },
});

const UserAvatar = styled(Avatar)({
  width: 150,
  height: 150,
  border: "6px solid #fff",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
});

const Profile = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { CurrentUser, loading, error, errorMessage } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(FetchUserProfile());
  }, [dispatch]);

  const userData = CurrentUser;

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{errorMessage}</Typography>;

  return (
    <ProfileContainer>
      <Container>
        <ProfilePaper elevation={5}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
              <UserAvatar src="" alt={userData?.username || ""} sx={{ mb: 2 }} />
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {userData?.fullName || userData?.username}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {userData?.role || "Utilisateur"}
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" sx={{ mb: 2, color: "#6b48ff" }}>
                {t("Informations Personnelles")}
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <List>
                {[
                  { icon: <EmailIcon />, label: t("Email"), value: userData?.email },
                  { icon: <PhoneIcon />, label: t("Téléphone"), value: userData?.phone },
                  { icon: <HomeIcon />, label: t("Adresse"), value: userData?.address },
                  { icon: <WorkIcon />, label: t("Domaine"), value: userData?.domain },
                ].map((item, i) => (
                  <ListItem key={i}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.label} secondary={item.value || "Non renseigné"} />
                  </ListItem>
                ))}
              </List>
              <Divider sx={{ my: 3 }} />
              <Stack sx={{ display: "flex", flexDirection: "row", gap: "20px" }}>
                <ButtonComponent
                  color="orange"
                  text={t("Modifier Profil")}
                  icon={<EditIcon />}
                  onClick={() => console.log("Edit profile clicked")}
                />
                <ButtonComponent
                  color="orange"
                  text={t("Modifier mot de passe")}
                  icon={<LockResetIcon />}
                  onClick={() => console.log("Change password clicked")}
                />
              </Stack>
            </Grid>
          </Grid>
        </ProfilePaper>
      </Container>
    </ProfileContainer>
  );
};

export default Profile;
