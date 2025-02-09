import styles from "./styles.module.css";
import { Link, useHistory } from "react-router-dom";

import {
  Button,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Badge,
  IconButton,
} from "@chakra-ui/react";

// import { FiShoppingCart } from "react-icons/fi";

import { useAuth } from "../../contexts/AuthContext";
import { useBasket } from "../../contexts/BasketContext";

function Navbar() {
  const history = useHistory();
  const { loggedIn, logout } = useAuth();
 
  const { items } = useBasket();
  const handleLogout = async () => {
    logout();
    history.push("/login");
  };
  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <div className="logo">
          <Link to="/">eCoomerce</Link>
        </div>
        <ul className={styles.menu}>
          <li>
            <Link to="/">Products</Link>
          </li>
        </ul>
      </div>
      <div className={styles.right}>
        {!loggedIn && (
          <>
            <Link to="/login">
              <Button colorScheme="pink">Login</Button>
            </Link>
            <Link to="/register">
              <Button colorScheme="pink">Register</Button>
            </Link>
          </>
        )}

        {loggedIn && (
          <>
            <Menu>
              <MenuButton mr="4" as={IconButton} variant="outline">
                <Badge ml="1" colorScheme="red">
                  {items.length}
                </Badge>
              </MenuButton>
              <MenuList>
                <MenuItem>
                  <Link to="/basket">Go to Basket</Link>
                </MenuItem>
              </MenuList>
            </Menu>

            <Avatar size="sm" />
            <Button onClick={handleLogout} colorScheme="pink" ml="4">
              Logout
            </Button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

// function Navbar() {
// 	const { loggedIn, user } = useAuth();
// 	const { items } = useBasket();

// 	return (
// 		<nav className={styles.nav}>
// 			<div className={styles.left}>
// 				<div className={styles.logo}>
// 					<Link to="/">eCommerce</Link>
// 				</div>

// 				<ul className={styles.menu}>
// 					<li>
// 						<Link to="/">Products</Link>
// 					</li>
// 				</ul>
// 			</div>

// 			<div className={styles.right}>
// 				{!loggedIn && (
// 					<>
// 						<Link to="/signin">
// 							<Button colorScheme="pink">Login</Button>
// 						</Link>
// 						<Link to="/signup">
// 							<Button colorScheme="pink">Register</Button>
// 						</Link>
// 					</>
// 				)}

// 				{loggedIn && (
// 					<>
// 						{items.length > 0 && (
// 							<Link to="/basket">
// 								<Button colorScheme="pink" variant="outline">
// 									Basket ({items.length})
// 								</Button>
// 							</Link>
// 						)}

// 						{user?.role === "admin" && (
// 							<Link to="/admin">
// 								<Button colorScheme="pink" variant="ghost">
// 									Admin
// 								</Button>
// 							</Link>
// 						)}

// 						<Link to="/profile">
// 							<Button>Profile</Button>
// 						</Link>
// 					</>
// 				)}
// 			</div>
// 		</nav>
// 	);
// }

// export default Navbar;
