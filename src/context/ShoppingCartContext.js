import { createContext, useState, useContext } from "react";
import { AuthContext } from "./AuthContext";

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("movieapp.shoppingcart")) ?? []
  );

  function saveInCart(movie) {
    const object = {
      movie,
      user_id: user.id,
      quantity: 1,
    };

    items[items.length] = object;
    setItems([...items]);
    saveInLocalStorage(items);
  }

  function saveInLocalStorage(items) {
    localStorage.setItem("movieapp.shoppingcart", JSON.stringify(items));
  }

  function movieIsInCart(id) {
    const movie = items.find(
      (item) => item.movie.imdbID === id && item.user_id === user.id
    );
    return movie;
  }

  function upOne(id) {
    const movie = movieIsInCart(id);
    if (movie === undefined) return;
    if (movie.quantity >= 10) return;
    const index = items.findIndex(
      (item) => item.movie.imdbID === id && item.user_id === user.id
    );
    movie.quantity++;
    items[index] = movie;
    setItems([...items]);
    saveInLocalStorage(items);
  }

  function downOne(id) {
    const movie = movieIsInCart(id);
    if (movie === undefined) return;

    const index = items.findIndex(
      (item) => item.movie.imdbID === id && item.user_id === user.id
    );
    movie.quantity--;

    if (movie.quantity < 2) {
      const newItems = items.filter(
        (item) => item.movie.imdbID !== id && item.user_id !== user.id
      );
      localStorage.removeItem("movieapp.shoppingcart");
      setItems(newItems);
      saveInLocalStorage(items);
      return;
    }
    items[index] = movie;
    setItems([...items]);
    saveInLocalStorage(items);
  }

  return (
    <ShoppingCartContext.Provider
      value={{ items, saveInCart, movieIsInCart, upOne, downOne }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
