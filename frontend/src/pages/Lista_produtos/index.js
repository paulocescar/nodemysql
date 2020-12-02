import React, {useState, useRef, useEffect, useMemo} from 'react';
import CurrencyInput from 'react-currency-masked-input';
import $ from 'jquery';
import Popper from 'popper.js';
import { IoCloseCircle } from "react-icons/io5";

import './styles.css';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Form, Button, Checkbox, Label, Input, Textarea, Alert } from 'reactstrap';

import api from '../../services/api';
import Header from '../Header'
import JoditEditor from "jodit-react";


export default function Produtos({ history }){
    const [thumbnail, setThumbnail] = useState(null);
    const [photos, setPhotos] = useState([]);
    const [photosArray, setPhotosArray] = useState([]);
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [base_price, setBase_price] = useState('');
    const [amount, setAmount] = useState('')
    const [error, setError] = useState('')

	const editor = useRef(null)
	const config = {
		readonly: false
	}

    const preview = useMemo(() => {
         return thumbnail ? URL.createObjectURL(thumbnail) : '';
    },[thumbnail]);


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
            setPhotosArray([...photosArray, e.target.files[0]])
        }
    }
    
    async function handleSubmit(event){
        event.preventDefault();
        const description = $('.jodit-wysiwyg')[0].innerHTML    // console.log(photos)
        
        const form = new FormData();
        for(var i =0; i < photosArray.length; i++){
            console.log(photosArray[i])
            form.append('photos', photosArray[i])
        }
        form.append('title', title)
        form.append('description', description)
        form.append('price', price)
        form.append('base_price', base_price)
        form.append('amount', amount)

        try {
            await api.post('/add_product', form, { headers: { 
                        // 'x-access-token': localStorage.getItem('x-access-tokenSECRET'),
                        'Content-Type': 'multipart/form-data'
                 }}
            ).then(function(response){
                if(response.data.auth == false){
                    window.location.href = 'http://localhost:3000/logout';
                    console.log(response.data.auth)
                }

            }).catch(function(err){
                console.log(err)
            });  
        } catch (err) {
            
            console.log(err);
            setError({ error: "Ocorreu um erro ao registrar sua conta. T.T" });
        }

        history.push('/Produtos');
    }
    
    return (
        <div className="container" style={{marginTop: '20px'}}>
            <form onSubmit={handleSubmit} id="formdata">
                <div className="row">
                    <div className="col-md-12 card-body" id="photo">
                   
                        {photos.map((photo, index) => (
                            <div className="col-md-3 fleft" key={index}>
                                <a style={{position: 'absolute', fontSize: '32px', left: '0', top: '-15px', padding: '0', backgroundColor: '#fff', borderRadius: '32px'}} onClick={(() => removeDivImg(index))}><IoCloseCircle/></a>
                                <label 
                                    id={"thumbnail"+index}
                                    name={"photo"+index}
                                    style={{ backgroundImage: `url(${preview})` }}
                                    className={thumbnail ? 'hasThumbnail thumb' : 'thumb'}>
                                    {/* <input type="file" id="1" onChange={event => img(event.target.files[0], 'thumbnail')}/> */}
                                    <input type="file" id={index} name={"p"+index} onChange={(e) => handlePhoto(e, index)}/>
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
                            <input id="name" className="form-control" name="title"
                                    placeholder="Ex: Celular, Sapato, Motor, Placa mãe"
                                    value={title}
                                    onChange={event => setTitle(event.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Descrição *</label>
                            <JoditEditor name="descricao"
                                id="desc"
                                ref={editor}
                                config={config}
                                tabIndex={0} />
                        </div>
                    </div>

                    
                    <div className="col-md-12 card-body">
                        <h4>Preços</h4>
                        <div className="row">
                            <div className="form-group col-md-3">

                                <label htmlFor="price">Preço *</label>
                                <CurrencyInput className="form-control" name="price" id="price" 
                                        placeholder="R$" separator={"."}
                                        value={price}
                                        onChange={event => setPrice(event.target.value)}/>
                            </div>
                            <div className="form-group col-md-3">

                                <label htmlFor="promoprice">Preço promocional *</label>
                                <CurrencyInput className="form-control" name="promoprice" id="promoprice" 
                                        placeholder="R$" separator={"."}
                                        value={base_price}
                                        onChange={event => setBase_price(event.target.value)}/>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-md-12 card-body">
                        <h4>Estoque</h4>
                        <div className="row">
                            <div className="form-group col-md-3">

                                <label htmlFor="qtd">Quantidade *</label>
                                <input type="number" className="form-control" name="qtd" id="qtd" 
                                        value={amount}
                                        onChange={event => setAmount(event.target.value)}/>
                            </div>
                        </div>
                    </div>
                    
                </div>
            <button type="submit" className="btn btn-primary">Adicionar produto</button>
            </form>
        </div>
    )
}