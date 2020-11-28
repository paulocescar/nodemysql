import React, {useState, useRef, useEffect, useMemo} from 'react';
import NumberFormat from 'react-number-format';
import MaskedInput from 'react-maskedinput';
import CurrencyInput from 'react-currency-masked-input';
import $ from 'jquery';
import Popper from 'popper.js';
import { IoCloseCircle } from "react-icons/io5";

import './styles.css';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Form, Button, Checkbox, Label, Input, Textarea, Alert } from 'reactstrap';

import createImage from './images.js';

import api from '../../services/api';
import Header from '../Header'
import JoditEditor from "jodit-react";


export default function Produtos({ history }){
    const [thumbnail, setThumbnail] = useState(null);
    const [photos, setPhotos] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [index, setIndex] = useState(0);
	const editor = useRef(null)
    const [content, setContent] = useState('')
    
	const config = {
		readonly: false
	}

    const preview = useMemo(() => {
         return thumbnail ? URL.createObjectURL(thumbnail) : '';
    },[thumbnail]);

    useEffect (() => {
        function pho(){
            $('input[type=file]').on('change',function(e){
                if(e !== undefined || e !== null || e !== ''){
                    $('#thumbnail'+e.target.id).attr('class','hasThumbnail thumb')
                    $('#thumbnail'+e.target.id).attr('style','background-Image: url("'+URL.createObjectURL(e.target.files[0])+'")')


                    console.log(e)
                }
            })
        }
        
    },{})

    


    const addDivImg = (e) => {
        e.preventDefault()
        setPhotos([ ...photos, ""]);
    }

    const removeDivImg = (position) => {
        setPhotos([ ...photos.filter((_, index) => index != position)]);
    }

    const handlePhoto = (e, index) => {
        photos[index] = e.target.value;
        setPhotos([ ...photos]);
        
        if(e !== undefined || e !== null || e !== ''){
            $('#thumbnail'+e.target.id).attr('class','hasThumbnail thumb')
            $('#thumbnail'+e.target.id).attr('style','background-Image: url("'+URL.createObjectURL(e.target.files[0])+'")')


            console.log(e)
        }
    }

    async function handleSubmit(event){
        event.preventDefault();
        const data = new FormData();
        const user_id = localStorage.getItem('user');

         return data;

        await api.post('/spots', data,{
                headers: { 'x-access-token': localStorage.getItem('x-access-tokenSECRET')}
            }
        )

        history.push('/dashboard');
    }
    return (
        <div className="container" style={{marginTop: '20px'}}>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-12 card-body" id="photo">
                        
                        {photos.map((photo, index) => (
                            <div className="col-md-3 fleft" key={index}>
                                <a style={{position: 'absolute', fontSize: '32px', left: '0', top: '-15px', padding: '0', backgroundColor: '#fff', borderRadius: '32px'}} onClick={(() => removeDivImg(index))}><IoCloseCircle/></a>
                                <label 
                                    id={"thumbnail"+index}
                                    style={{ backgroundImage: `url(${preview})` }}
                                    className={thumbnail ? 'hasThumbnail thumb' : 'thumb'}>
                                    {/* <input type="file" id="1" onChange={event => img(event.target.files[0], 'thumbnail')}/> */}
                                    <input type="file" id={index} name={index} onChange={(e) => handlePhoto(e, index)}/>
                                    <img alt="selecione a imagem" />
                                </label>
                            </div>
                            ))
                        }
                    <button type="submit" className="btn btnphoto" style={{marginTop: '80px'}} onClick={addDivImg}>+</button>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-md-12 card-body">
                        <h4>Nome e descrição</h4>
                        <div className="form-group">
                            <label htmlFor="name">Nome do produto *</label>
                            <input id="name" className="form-control"
                                    placeholder="Ex: Celular, Sapato, Motor, Placa mãe"
                                    value={name}
                                    onChange={event => setName(event.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Descrição *</label>
                            <JoditEditor name="descricao"
                                ref={editor}
                                value={content}
                                config={config}
                                tabIndex={0} 
                                onChange={newContent => {}}
                        />
                        </div>
                    </div>

                    
                    <div className="col-md-12 card-body">
                        <h4>Preços</h4>
                        <div className="row">
                            <div className="form-group col-md-3">

                                <label htmlFor="price">Preço *</label>
                                <CurrencyInput className="form-control" name="valor" id="price" 
                                        placeholder="R$" separator={"."}
                                        onChange={event => setPrice(event.target.value)}/>
                            </div>
                            <div className="form-group col-md-3">

                                <label htmlFor="promoprice">Preço promocional *</label>
                                <CurrencyInput className="form-control" name="promoprice" id="promoprice" 
                                        placeholder="R$" separator={"."}
                                        onChange={event => setPrice(event.target.value)}/>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-md-12 card-body">
                        <h4>Estoque</h4>
                        <div className="row">
                            <div className="form-group col-md-3">

                                <label htmlFor="qtd">Quantidade *</label>
                                <input type="text" className="form-control" name="qtd" id="qtd" />
                            </div>
                            <div className="form-group col-md-3">

                                <label htmlFor="price">SKU </label>
                                <input type="text" className="form-control" name="sku" id="sku" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-md-12 card-body">
                        <h4>Frete</h4>
                        <div className="row">
                            <div className="form-group col-md-3">
                                <input type="checkbox" name="gratis" id="gratis" className="checkbox" />
                                <label htmlFor="gratis">Grátis </label>
                            </div>
                        </div>
                    </div>
                </div>
            <button type="submit" className="btn btn-primary">Adicionar produto</button>
            </form>
        </div>
    )
}