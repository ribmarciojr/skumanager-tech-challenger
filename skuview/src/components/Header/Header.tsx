import { AppBar, Toolbar, Typography, IconButton, Avatar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function Header() {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#93DA49", boxShadow: "none", padding: "10px 20px" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

        <Typography variant="h6" sx={{ fontWeight: "bold", color: "white" }}>
          GB <span style={{ fontWeight: "400" }}>SKUMANAGER</span>
        </Typography>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Avatar alt="User Profile" src="https://via.placeholder.com/40" />
          <IconButton>
            <MenuIcon sx={{ color: "white" }} />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}
