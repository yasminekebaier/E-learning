import React from 'react'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Box, Container, Typography, Button, Card, CardContent, useTheme, alpha, Stack } from "@mui/material"
import { ArrowForward } from "@mui/icons-material"
const servicesData = [
  {
    id: 1,
    title: "L’apprentissage en ligne simplifié",
    description:
      "Une interface intuitive pour permettre aux enseignants de partager leurs cours et aux élèves d’apprendre à leur rythme.",
    image: "/placeholder.svg?height=200&width=200",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  },
  {
    id: 2,
    title: "Une plateforme inclusive, ludique et intuitive",
    description:
      "Notre plateforme offre une expérience d’apprentissage adaptée à tous les enfants, quels que soient leurs besoins spécifiques.🎯 ACCESSIBLE POUR TOUS  Grâce à des outils adaptés, chaque enfant peut apprendre à son rythme.📈 SUIVI PERSONNALISÉ Suivi en temps réel de la progression et accompagnement personnalisé.",
    image: "/placeholder.svg?height=200&width=200",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  },
  {
    id: 3,
    title: "Espace dédié aux enseignants",
    description:
      "Les enseignants peuvent créer et gérer des contenus adaptés, suivre les progrès, et personnaliser l’apprentissage.",
    image: "/placeholder.svg?height=200&width=200",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  },
]

const ServiceCard = ({ service }) => {
  const theme = useTheme()

  return (
    <Card
      sx={{
        p: 3,
        m: 2,
        borderRadius: 3,
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
        background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
        border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        position: "relative",
        overflow: "hidden",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
          "& .service-image": {
            transform: "scale(1.05)",
          },
        },
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: service.gradient,
        },
      }}
    >
      <Stack spacing={3} sx={{ height: "100%" }}>
        {/* Image du service */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Box
            className="service-image"
            sx={{
              width: 120,
              height: 120,
              borderRadius: 3,
              background: service.gradient,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
              transition: "transform 0.3s ease",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
              },
            }}
          >
            <Box
              component="img"
              src={service.image}
              alt={service.title}
              sx={{
                width: 80,
                height: 80,
                objectFit: "cover",
                borderRadius: 2,
                position: "relative",
                zIndex: 1,
              }}
            />
          </Box>
        </Box>

        {/* Contenu du service */}
        <Box sx={{ flex: 1, textAlign: "center" }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: theme.palette.text.primary,
              mb: 2,
              fontSize: "1.5rem",
              lineHeight: 1.3,
            }}
          >
            {service.title}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: theme.palette.text.secondary,
              lineHeight: 1.6,
              fontSize: "0.95rem",
              mb: 3,
            }}
          >
            {service.description}
          </Typography>
        </Box>

        {/* Bouton En savoir plus */}
        <Box sx={{ textAlign: "center" }}>
          <Button
            variant="outlined"
            endIcon={<ArrowForward />}
            sx={{
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
              px: 3,
              py: 1,
              borderRadius: 2,
              fontWeight: 600,
              fontSize: "0.9rem",
              textTransform: "none",
              transition: "all 0.3s ease",
              "&:hover": {
                background: theme.palette.primary.main,
                color: "white",
                transform: "translateY(-2px)",
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
              },
            }}
          >
            En savoir plus
          </Button>
        </Box>
      </Stack>

      {/* Indicateur décoratif */}
      <Box
        sx={{
          position: "absolute",
          bottom: 16,
          right: 16,
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: theme.palette.primary.main,
        }}
      />
    </Card>
  )
}
const NosServices = () => {
     const theme = useTheme()

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    rtl: false,
    pauseOnHover: true,
    dotsClass: "slick-dots custom-dots",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <>
      <Box
      sx={{
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.02)} 0%, ${alpha(theme.palette.secondary.main, 0.02)} 100%)`,
        py: 8,
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%)",
          pointerEvents: "none",
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* En-tête de section */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
     <Typography
            variant="h3"
            sx={{
            variant:"h4" ,fontWeight:"bold", color:"#234aa0",
              mb: 2,}}>Nos Services
          </Typography>
</Box>
        {/* Carousel */}
        <Box
          sx={{
            "& .slick-dots": {
              bottom: -50,
              "& li button:before": {
                fontSize: 12,
                color: theme.palette.primary.main,
                opacity: 0.5,
              },
              "& li.slick-active button:before": {
                opacity: 1,
                color: theme.palette.primary.main,
              },
            },
            "& .slick-prev, & .slick-next": {
              zIndex: 1,
              "&:before": {
                fontSize: 24,
                color: theme.palette.primary.main,
              },
            },
            "& .slick-prev": {
              left: -40,
            },
            "& .slick-next": {
              right: -40,
            },
          }}
        >
          <Slider {...settings}>
            {servicesData.map((service) => (
              <div key={service.id}>
                <ServiceCard service={service} />
              </div>
            ))}
          </Slider>
        </Box>

        {/* Bouton principal en bas */}
       {/*  <Box sx={{ textAlign: "center", mt: 6 }}>
          <Button
            variant="contained"
            endIcon={<ArrowForward />}
            sx={{
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              color: "white",
              px: 6,
              py: 2,
              borderRadius: 3,
              fontWeight: 600,
              fontSize: "1.1rem",
              textTransform: "none",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 12px 32px rgba(0, 0, 0, 0.2)",
                background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
              },
            }}
          >
            Découvrir tous nos services
          </Button>
        </Box> */}

        {/* Éléments décoratifs */}
        <Box
          sx={{
            position: "absolute",
            top: "20%",
            right: "10%",
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: theme.palette.primary.main,
            opacity: 0.6,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "60%",
            right: "5%",
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: theme.palette.secondary.main,
            opacity: 0.4,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "30%",
            right: "15%",
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: theme.palette.primary.main,
            opacity: 0.3,
          }}
        />
      </Container>
    </Box>
    </>
  )
}

export default NosServices