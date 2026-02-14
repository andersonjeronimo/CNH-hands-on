import express from "express";
import axios from "axios";
import { Request, Response, NextFunction } from 'express';
const router = express.Router();

router.get('/get_data', async function (req: Request, res: Response, next: NextFunction) {

    var type = req.query.type;
    var search_query = req.query.parent_value;//ID da UF

    if (type == 'load_state') {
        //buscar UFs na API do IBGE
        //https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome
    }

    if (type == 'load_city') {
        //buscar cidades na API do IBGE por ID da UF        
        //https://servicodados.ibge.gov.br/api/v1/localidades/estados/33/municipios?orderBy=nome
        try {            
            const response = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${search_query}/municipios?orderBy=nome`);
            const apiData = response.data;           
            res.json(apiData);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error fetching data from IBGE API');
        }
    }    

});

export default router;