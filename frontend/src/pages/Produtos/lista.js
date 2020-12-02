import React, {useState, useRef, useEffect, useMemo} from 'react';
import CurrencyInput from 'react-currency-masked-input';
import $ from 'jquery';
import Popper from 'popper.js';
import { IoCloseCircle, IoSearchOutline } from "react-icons/io5";

import './styleslista.css';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Form, Button, Checkbox, Label, Input, Textarea, Alert } from 'reactstrap';

import api from '../../services/api';

export default function Produtos({ history }){
    const [produtos, setProdutos] = useState([]);
    const [error, setError] = useState('')

    useEffect(() => {
        async function loadProducts() {
            const response = await api.get('/products',{
                headers: { 'x-access-token': localStorage.getItem('x-access-tokenSECRET') }
            });

            setProdutos(response.data)
        }
        loadProducts()
    }, [])

    return (
        <div className="container containerbg" style={{marginTop: '20px'}}>
            <a href="/add_Produtos" class="btn btn-success">Adicionar</a>
            <h3>Anúncios</h3>
            <table className="table table-striped">
                <thead>
                    <th style={{width: '10%'}}>
                    <div class="form-group">
                        <div class="form-check">
                        <label class="chk">
                            <input type="checkbox" name="exemplo" />
                            <span></span>
                        </label>
                        </div>
                    </div>
                    </th>
                    <th style={{width: '10%'}}></th>
                    <th style={{width: '15%'}}></th>
                    <th style={{width: '15%'}}>
                        <div class="input-group mb-2">
                            <select class="custom-select">
                                <option value="10">10 itens</option>
                                <option value="50">50 itens</option>
                                <option value="100">100 itens</option>
                            </select>
                        </div>
                    </th>
                    <th style={{width: '15%'}}>
                        <div class="input-group mb-2">
                            <select class="custom-select">
                                <option value="ativo">Ativos</option>
                                <option value="desativado">Desativados</option>
                            </select>
                        </div>
                    </th>
                    <th style={{width: '35%'}}>
                            <div class="input-group mb-2">
                                <input type="text" class="form-control" id="search" placeholder="buscar"/>
                                <div class="input-group-prepend">
                                    <div class="input-group-text inputgroup"><IoSearchOutline/></div>
                                </div>
                            </div>
                    </th>
                </thead>
                <tbody>
                {produtos.map((produto, index) => (
                    <tr key={index}>
                        <td>
                            <div class="form-check">
                                <label class="chk">
                                    <input type="checkbox" name="exemplo" />
                                    <span></span>
                                </label>
                            </div>
                        </td>
                        <td>
                            {produto.Product_images.map((img, index) => (
                            <img src={`http://localhost:3333/${img.url}`} alt="imgs" style={{width: '80px',float:'left'}}></img>
                            ))}
                        </td>
                        <td>
                            <p className="titulo">{produto.title}</p>
                            <p className="freteSku"> frete comum | {produto.id}</p>

                        </td>
                        <td>
                            <p>R$ {produto.price.replace(',','').replace('.',',')}</p>
                        </td>
                        <td>
                            <p>{produto.amount} Un.</p>
                        </td>
                        <td>
                            <a className="btn btndefault" href={"add_Produtos/"+produto.id}>Editar</a>
                            <a className="btn btndefault" href={"add_Produtos/"+produto.id}>desativar</a>
                        </td>
                    </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    )
}