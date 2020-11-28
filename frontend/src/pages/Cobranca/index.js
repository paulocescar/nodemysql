import React, { useState, useEffect, Component } from "react";
import NumberFormat from 'react-number-format';
import MaskedInput from 'react-maskedinput';
import CurrencyInput from 'react-currency-masked-input';
import $ from 'jquery';
import Popper from 'popper.js';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Form,
  Button,
  Label,
  Input,
  Alert
} from 'reactstrap';

import api from "../../services/api";
import Header from "../Header";

export default class Cobrancas extends React.Component {
    state = {
        cnpjCpf: "", 
        documento: "", 
        nome: "",
        cep: "", 
        endereco: "", 
        bairro: "", 
        cidade: "", 
        estado: "",
        ddd: "", 
        telefone: "", 
        email: "",
        numDocumento: "", 
        dataRemessa: "",
        dataEmissao: "", 
        dataVencimento: "", 
        valor: "", 
        dataProtesto: "", 
        tipoDebito: "",
        error: ""
    };

    
    handleDebt = async e => {
        
        e.preventDefault();
        const formData = new FormData(e.target),
        formDataObj = Object.fromEntries(formData.entries())
        console.log(formDataObj)

        // this.setState({ cnpjCpf: formDataObj.cnpjCpf,
        //     documento: formDataObj.documento,
        //     nome: formDataObj.nome,
        //     cep: formDataObj.cep,
        //     endereco: formDataObj.endereco,
        //     bairro: formDataObj.bairro,
        //     cidade: formDataObj.cidade,
        //     estado: formDataObj.estado,
        //     ddd: formDataObj.ddd,
        //     telefone: formDataObj.telefone,
        //     numDocumento: formDataObj.numDocumento,
        //     dataRemessa: formDataObj.dataRemessa,
        //     dataEmissao: formDataObj.dataEmissao,
        //     dataVencimento: formDataObj.dataVencimento,
        //     valor: formDataObj.valor.replace('R$','').replace('.','').replace(',','.'),
        //     dataProtesto: formDataObj.dataProtesto,
        //     tipoDebito: formDataObj.tipoDebito
        // })

        // const { cnpjCpf, documento, nome, cep, endereco, bairro, cidade, estado, ddd, telefone, email, numDocumento, dataRemessa, dataEmissao, dataVencimento, valor, dataProtesto, tipoDebito } = this.state;
        if (!formDataObj.cnpjCpf || !formDataObj.documento || !formDataObj.nome || !formDataObj.cep || !formDataObj.endereco || !formDataObj.bairro || !formDataObj.cidade || !formDataObj.estado || !formDataObj.ddd || !formDataObj.telefone
            || !formDataObj.email || !formDataObj.numDocumento || !formDataObj.dataRemessa || !formDataObj.dataEmissao || !formDataObj.dataVencimento || !formDataObj.valor || !formDataObj.dataProtesto || !formDataObj.tipoDebito) {
        this.setState({ error: "Preencha todos os dados para se cadastrar" });
        } else {
        try {
            await api.post("/importacao", formDataObj, 
                {
                withCredentials: true,
                headers: {
                    'Access-Control-Allow-Origin': true,
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
                 },{ auth: {
                    username: 'testeapi',
                    password: 'testeapi'
                }
            }).then(res => {
                console.log(res.data)
                $('#alert').attr("style","marginTop:20px, display: block")
                // this.props.history.push("/dashboard");
             }).catch(error => {
                console.log(error.data)
                $('#alertDang').attr("style","marginTop:20px, display: block")
            })
        } catch (err) {
            console.log(err);
            this.setState({ error: "Ocorreu um erro ao registrar sua conta. T.T" });
            $('#alertDang').attr("style","marginTop:20px, display: block")
        }
        }
    };

    render() {
    
        function changeCEP(){
            var cep = $('#cep').val();
            if(cep.length >= 8){
                consultaCep()
            }
            
        }
    
        function consultaCep(novo){  
            if($('#cep').val() != ''){  
                $.getJSON("https://viacep.com.br/ws/"+ $('#cep').val().replace('-','') +"/json/?callback=?", function(dados) {
                    console.log(dados)
                    if (!("erro" in dados)) {
                        $('#endereco').val(dados.logradouro.length > 1 ? dados.logradouro : null )       
                        $('#bairro').val(dados.bairro.length > 1 ? dados.bairro : null )                  
                        $('#cidade').val(dados.localidade.length > 1 ? dados.localidade : null )                  
                        $('#estado').val(dados.uf.length > 1 ? dados.uf : null )   
                        
                        if(novo == 0){                          
                            $.scrollTo('#endereco_fields', 800);  
                        }            
                        $('#numero').focus(); 
                        $('#cep').removeAttr('readonly','false')
                    }         
                    else {
                        //CEP pesquisado não foi encontrado.
                        $('#error-cep').css('display','block')
                    }
                });
            }else{   
                $('#cep').focus();      
            }    
        } 

        return (
            <div>
                <Header></Header>
                <div className="container">
                    <Alert id="alert" variant={'success'} style={{marginTop:'20px', display:'none'}}>
                        Dados enviados com sucesso! <span onClick={() => $('#alert').attr("style","display: none")} style={{cursor:'pointer', float:'right', fontWeight:'bolder'}}>x</span>
                    </Alert>
                    <div className="alert alert-danger fade show" id="alertDang" variant="danger" role="alert" style={{marginTop:'20px', display: 'none'}}>Houve um erro na hora de enviar os dados! <span style={{cursor: 'pointer', float: 'right', fontWeight: 'bolder'}} onClick={() => $('#alertDang').attr("style","display: none")}>x</span></div>
                    <h1>Inserir cobrança</h1>
                    <Form onSubmit={this.handleDebt}>
                        <div className="row">
                            <div className="col-md-6 group">
                                <Label>CNPJ/CPF</Label>
                                <MaskedInput mask="11.111.111/1111-11" maxLength={18} className="form-control" name={'cnpjCpf'} id={'cnpjCpf'}
                                onChange={e => this.setState({ cnpjCpf: e.target.value })}/>
                            </div>
                            <div className="col-md-6 group">
                                <Label>Documento</Label>
                                <Input name="documento"
                                onChange={e => this.setState({ documento: e.target.value })}></Input>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 group">
                                <Label>Nome</Label>
                                <Input name={'nome'} id={'nome'}
                                onChange={e => this.setState({ nome: e.target.value })}></Input>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 group">
                                <Label>Cep</Label>
                                <MaskedInput mask="11111-111" maxLength={9} className="form-control" name={'cep'} id={'cep'} onChange={changeCEP} />
                            </div>
                            <div className="col-md-8 group">
                                <Label>Endereço</Label>
                                <Input name={'endereco'} id={'endereco'}
                                onChange={e => this.setState({ endereco: e.target.value })}></Input>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 group">
                                <Label>Bairro</Label>
                                <Input name={'bairro'} id={'bairro'}
                                onChange={e => this.setState({ bairro: e.target.value })}></Input>
                            </div>
                            <div className="col-md-4 group">
                                <Label>Cidade</Label>
                                <Input name={'cidade'} id={'cidade'}
                                onChange={e => this.setState({ cidade: e.target.value })}></Input>
                            </div>
                            <div className="col-md-2 group">
                                <Label>Estado</Label>
                                <Input name={'estado'} id={'estado'}
                                onChange={e => this.setState({ estado: e.target.value })}></Input>
                            </div>
                            <div className="col-md-2 group">
                                <Label>DDD</Label>
                                <Input name={'ddd'} id={'ddd'} maxLength={3}
                                onChange={e => this.setState({ ddd: e.target.value })}></Input>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 group">
                                <Label>Telefone</Label>
                                <MaskedInput mask="11111 1111" size="9" className="form-control" name={'telefone'} id={'telefone'}
                                onChange={e => this.setState({ telefone: e.target.value })}/>
                            </div>
                            <div className="col-md-4 group">
                                <Label>E-mail</Label>
                                <Input name={'email'} id={'email'} type="email"
                                onChange={e => this.setState({ email: e.target.value })}></Input>
                            </div>
                            <div className="col-md-4 group">
                                <Label>Numero Documento</Label>
                                <Input name={'numDocumento'} id={'numDocumento'}
                                onChange={e => this.setState({ numDocumento: e.target.value })}></Input>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 group">
                                <Label>Data Remessa</Label>
                                <Input name={'dataRemessa'} id={'dataRemessa'} type="date"
                                onChange={e => this.setState({ dataRemessa: e.target.value })}></Input>
                            </div>
                            <div className="col-md-4 group">
                                <Label>Data Emissão</Label>
                                <Input name={'dataEmissao'} id={'dataEmissao'} type="date"
                                onChange={e => this.setState({ dataEmissao: e.target.value })}></Input>
                            </div>
                            <div className="col-4 group">
                                <Label>Data Vencimento</Label>
                                <Input name={'dataVencimento'} id={'dataVencimento'} type="date"
                                onChange={e => this.setState({ dataVencimento: e.target.value })}></Input>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 group">
                                <Label>Valor</Label>
                                <CurrencyInput className="form-control" name={'valor'} id={'valor'} separator={"."}
                                onChange={e => this.setState({ valor: e.target.value })}/>
                            </div>
                            <div className="col-md-4 group">
                                <Label>Data Protesto</Label>
                                <Input name={'dataProtesto'} id={'dataProtesto'} type="date"
                                onChange={e => this.setState({ dataProtesto: e.target.value })}></Input>
                            </div>
                            <div className="col-md-4 group">
                                <Label>Tipo Débito</Label>
                                <Input name={'tipoDebito'} id={'tipoDebito'}
                                onChange={e => this.setState({ tipoDebito: e.target.value })}></Input>
                            </div>
                        </div>
                            <hr></hr>
                            <Button type="submit">Inserir</Button>
                            
                        
                    </Form>
            
                </div>
            </div>
            
        );
    }
}
