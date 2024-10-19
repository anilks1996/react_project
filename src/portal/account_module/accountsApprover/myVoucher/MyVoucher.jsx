import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import { Button, Col, Row } from "reactstrap";
import { useNavigate } from "react-router-dom";

const MyVoucher = () => {
  const navigate = useNavigate();
  return (
    <div>
      <form>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            bgcolor: "background.paper",
          }}
        >
          <nav aria-label="main mailbox folders">
            <Button
              style={{ background: "maroon", width: "100%", height: "50px" }}
              onClick={() => navigate("/ShowVoucherDate")}
              color="danger"
            >
              Compose New
            </Button>
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="Inbox (20)" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <DraftsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Sent Items" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <DraftsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Drafts (6)" />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <DraftsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Archieved Items" />
                </ListItemButton>
              </ListItem>
            </List>
          </nav>
        </Box>
      </form>
    </div>
  );
};
export default MyVoucher;
