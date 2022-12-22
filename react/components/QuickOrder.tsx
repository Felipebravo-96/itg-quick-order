import React, { useState, useEffect } from "react";
import { useMutation, useLazyQuery } from "react-apollo";
import UPDATE_CART from "../graphql/updateCart.graphql"
import GET_PRODUCT from "../graphql/getProductBySku.graphql"

const QuickOrder = () => {

    const [inputText, setInputText] = useState("")
    const [search, setSearch] = useState("")

    const [getProductData, { data: product }] = useLazyQuery(GET_PRODUCT)
    const [addToCart] = useMutation(UPDATE_CART)

    const handleCgange = (evt: any) => {
        setInputText(evt.target.value)
        console.log("input changed", inputText)
    }

    useEffect(() => {
        console.log("El resultado es:", product, search)
        if (!product) {
            let skuId = parseInt(inputText)
            addToCart({
                variables: {
                    salesChannel: "1",
                    items: [
                        {
                            id: skuId,
                            quantity: 1,
                            seller: "1"
                        }
                    ]
                }
            })
                .then(() => {
                    window.location.href = "/checkout"
                })
        }
    }, [product, search])

    const addProductToCart = () => {
        //ingresar declaracion de mutacion
        getProductData({
            variables: {
                sku: inputText
            }
        })
    }

    const searchProduct = (evt: any) => {
        evt.preventDefault()
        console.log("Buscando")
        if (!inputText) {
            alert("Ingrese algo")
        } else {
            //haremos la busqueda y buscaremos la data
            setSearch(inputText)
            addProductToCart()
        }
    }
    return (
        <div>
            <h2>Compra rapida con VTEX IO</h2>
            <form onSubmit={searchProduct}>
                <div>
                    <label htmlFor="sku">Ingresa el numero de SKU</label>
                    <input id="sku" type="text" onChange={handleCgange}></input>
                </div>
                <input type="submit" value="AÑADIR AL CARRITO" />
            </form>
        </div>
    )
}

export default QuickOrder