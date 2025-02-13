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
  Icon,
  Flex,
  Box
} from "@chakra-ui/react";

import { FiShoppingCart } from "react-icons/fi";
import { useAuth } from "../../contexts/AuthContext";
import { useBasket } from "../../contexts/BasketContext";

function Navbar() {
  const history = useHistory();
  const { loggedIn, logout, user } = useAuth();

  const { items } = useBasket();
  const handleLogout = async () => {
    logout();
    history.push("/login");
  };
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      p="4"
      className={styles.nav}
    >
      {/* Sol Taraf */}
      <Flex align="center" className={styles.left}>
        <Box className="logo" mr="8">
          <Link to="/">eCoomerce</Link>
        </Box>
        <Link to="/">Products</Link>
      </Flex>

      {/* Sağ Taraf */}
      <Flex align="center" className={styles.right}>

        {!loggedIn ? (
          <>
            <Link to="/login">
              <Button colorScheme="pink" mr="4">
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button colorScheme="pink">Register</Button>
            </Link>
          </>
        ) : (
          <>
          {
            user?.role === 'admin' && (
              <Link to='/admin'>
                <Button>
                  Admin
                </Button>
              </Link>
            )
          }
            <Menu>
              <MenuButton as={IconButton} variant="outline" mr="4">
                <Flex align="center">
                  <FiShoppingCart size="20px" style={{ marginRight: "8px" }} />
                  <Badge ml="1" colorScheme="red">
                    {items.length}
                  </Badge>
                </Flex>
              </MenuButton>
              <MenuList>
                <MenuItem>
                  <Link to="/basket">Go to Basket</Link>
                </MenuItem>
              </MenuList>
            </Menu>

            <Menu>
              <MenuButton>
                <Avatar size="sm" />
              </MenuButton>
              <MenuList>
                <MenuItem>
                  <Link to="/profile">Profile</Link>
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </>
        )}
      </Flex>
    </Flex>
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
