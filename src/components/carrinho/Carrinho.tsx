import { toast } from "react-toastify";
import { addToCart, removeItem, removeToCart } from "../../store/tokens/Action";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { TokenState } from "../../store/tokens/TokensReducer";
import { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import './Carrinho.css';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import Produto from "../../models/Produto";
import Usuario from "../../models/Usuario";


function Carrinho() {
  const navigate = useNavigate();
  const carrinho = useSelector<TokenState, TokenState["produtos"]>(
    (state) => state.produtos
  );
  const token = useSelector<TokenState, TokenState["token"]>(
    (state) => state.token
  );

  const userId = useSelector<TokenState, TokenState["id"]>((state) => state.id);

  const [usuario, setUsuario] = useState<Usuario>({
    id: +userId,
    foto: "",
    nome: "",
    usuario: "",
    senha: "",
    produto: null,
  });

  useEffect(() => {
    if (token === "") {
      toast.error("Por favor efetue o login para acessar essa página", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "colored",
        progress: undefined,
      });
      navigate("/login");
    }
  }, []);

  let valorTotal = 0;

  const dispatch = useDispatch();

  function buy() {
    dispatch(removeItem([]));
    toast.success("Compra realizada com sucesso", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      theme: "colored",
      progress: undefined,
    });
    navigate("/home");
  }


  function removeFromCart(item: Produto) {
    dispatch(removeToCart(item));
    toast.success("Produto removido com sucesso!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      theme: "colored",
      progress: undefined,
    });
    navigate("/carrinho")
  }



  return (
    <>
      <Grid className="centralizar">
        <Grid className="container-carrinho min-height">
          <Typography align="center" variant="h4">
            Produtos Adicionados
          </Typography>

          {carrinho.map((item) => (

            <>

              <Grid className="class2 centralizar " container my={1} alignItems="center">
                <Box className="centralizar" display="flex" flexWrap={"wrap"} width={"50%"}>
                  <Grid className="class3 gap class-borda" item xs={12} p={2}>
                    <img className="img_listCart" src={item.foto} alt={item.nome} />
                    <Box className="space-between class5">
                      <Box className="class1">

                        <Typography className="fonte">{item.nome}</Typography>
                        
                        <Typography>{usuario.nome}</Typography>
                      </Box>
                      <Box className="class1 alinhar space-between">
                        <Typography className="fonte2">R$ {item.valor}</Typography>
                        <Box className="class1 class4">
                          <Button type="submit" color="primary" onClick={() => removeFromCart(item)}>
                            <DisabledByDefaultIcon />
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                </Box>
              </Grid>
            </>
          ))}


          <>

            <Typography align="center">
              {" "}
              {carrinho.map((price) => {
                {
                  valorTotal = valorTotal + price.valor;
                }
              })}

              <Grid xs={12} className="class4 ">
                <Grid xs={6} className="fonte">Valor Total: </Grid>
                <Grid xs={6} className="fonte3 ">R${valorTotal}</Grid>
              </Grid>
            </Typography>
            <Box className="class4">
            <Box marginTop={2} textAlign="center">
              <Link to="/produtos">
                <Button
                  variant="contained"
                  color="secondary"
                  className="btnCancelar"
                >
                  Voltar
                </Button>
              </Link>
              </Box>
              <Box>
              <Button className="btnComprar" type="submit" variant="contained" onClick={buy}>
                Comprar
              </Button>
              </Box>
            
            </Box>
          </>
        </Grid>
      </Grid>
    </>
  );
}

export default Carrinho;