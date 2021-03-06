import React, {useState} from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import FavoriteIcon from '@material-ui/icons/Favorite';
import SearchIcon from '@material-ui/icons/Search';
import {Search} from "./inner-components/Search/Search";
import {FormControlLabel, Menu, MenuItem, Switch} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../redux-store/store";
import {setDarkTheme} from "../redux-store/dark-theme-reducer";
import {NavLink, useParams} from "react-router-dom";
import {login, logout} from "../redux-store/login-reducer";
import googleIcon from '../assets/images/google.jpg'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

type HeaderType = {}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        grow: {
            flexGrow: 1,
        },
        title: {},

        sectionDesktop: {

            [theme.breakpoints.up('md')]: {
                display: 'flex',
            },
        },
        sectionMobile: {
            display: 'flex',
            [theme.breakpoints.up('md')]: {},
        },
    }),
);

export default function Header(props: HeaderType) {

    const [anchorEl, setAnchorEl] = React.useState(null)

    const handleClick = (e: any) => {
        setAnchorEl(e.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const dispatch = useDispatch()

    const darkMode = useSelector<AppStateType, boolean>(state => state.darkThemeReducer.darkMode)
    const user = useSelector<AppStateType, any>(state => state.loginReducer.user)
    const darkModeOnChange = () => {
        dispatch(setDarkTheme(!darkMode))
    }

    const classes = useStyles();

    const [search, setSearch] = useState(false)
    const searchHandler = () => {
        setSearch(!search)
    }

    const favoritesMoviesData = useSelector<AppStateType, any>(state => state.loginReducer.favoriteMovies)

    return (
        <div className={classes.grow}>
            <AppBar position="static"

            >
                <Toolbar>

                    <Typography className={classes.title} variant="h6" noWrap>
                        <NavLink to={'/'}>Filmix</NavLink>
                    </Typography>
                    {
                        user ? <div>
                                <img
                                    style={{width: 30, borderRadius: '50%', cursor: 'pointer'}}
                                    role='button'
                                    alt='avatar'
                                    src={user.photoURL}
                                    height='100%'
                                    aria-controls="simple-menu"
                                    aria-haspopup="true"
                                    onClick={handleClick}
                                />
                                <Menu
                                    style={{top: '45px'}}
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem component={NavLink} to={'/favorites'}
                                              onClick={handleClose}>Favorites</MenuItem>
                                    <MenuItem onClick={() => dispatch(logout())}>Logout</MenuItem>
                                </Menu>
                            </div>
                            : <IconButton onClick={() => dispatch(login())} color="inherit">
                                <AccountCircleIcon/>

                            </IconButton>

                    }

                    <div className={classes.grow}/>
                    <div className={classes.sectionDesktop}>

                        <FormControlLabel control={<Switch checked={darkMode}
                                                           onChange={darkModeOnChange}
                                                           color={"secondary"}
                        />}
                                          label="Dark Mode"/>


                        <IconButton color="inherit"
                                    onClick={searchHandler}
                        >

                            <SearchIcon/>

                        </IconButton>

                        <NavLink to={'/favorites'}>
                            <IconButton color="inherit">
                                <Badge badgeContent={Object.keys(favoritesMoviesData).length}
                                       color="secondary"
                                    /*variant="dot"*/
                                       anchorOrigin={{
                                           vertical: 'bottom',
                                           horizontal: 'right',
                                       }}
                                >
                                    <FavoriteIcon/>
                                </Badge>
                            </IconButton>
                        </NavLink>

                    </div>
                </Toolbar>
            </AppBar>

            <Search enable={search}
                    onCancel={searchHandler}
                    darkMode={darkMode}
            />



        </div>
    );
}
