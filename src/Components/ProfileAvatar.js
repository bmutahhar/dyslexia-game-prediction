import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import {
  Avatar,
  IconButton,
  MenuItem,
  ClickAwayListener,
  Grow,
  Popper,
  Paper,
  MenuList,
} from "@material-ui/core";
import { signout } from "../actions";

const ProfileAvatar = ({ menu, pfp }) => {
  const [open, setOpen] = useState(false);
  const anchorRef = React.useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const handleToggle = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      {menu ? (
        <>
          <IconButton
            className={classes.iconButton}
            ref={anchorRef}
            aria-controls={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            <Avatar alt="pfp" src={pfp} className={classes.avatar} />
          </IconButton>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList autoFocusItem={open} id="menu-list-grow">
                      <MenuItem
                        onClick={(event) => {
                          handleClose(event);
                          history.push("/profile");
                        }}
                      >
                        My account
                      </MenuItem>
                      <MenuItem
                        onClick={(event) => {
                          handleClose(event);
                          dispatch(signout());
                          history.replace("/");
                        }}
                      >
                        Logout
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </>
      ) : (
        <Avatar alt="pfp" src={pfp} className={classes.avatar} />
      )}
    </>
  );
};

export default ProfileAvatar;

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    objectFit:"contain",
  },
  iconButton: {
    padding: 0,
    margin: 0,
  },
  root: {
    display: "flex",
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));
