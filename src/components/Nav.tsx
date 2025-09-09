import { NavLink } from "react-router-dom";
const linkStyle: React.CSSProperties = {marginRight: 16, textDecoration:"none"};

export default function Nav(){
    return(
        < nav style={{borderBottom: "2px solid #e5a7b6, padding:16"}} >
            <NavLink to="/" style={linkStyle} >Home</NavLink>
            <NavLink to="/users" style={linkStyle}>Users</NavLink>
            <NavLink to="/posts" style={linkStyle} >Posts</NavLink>
        </nav>
        
    )
}