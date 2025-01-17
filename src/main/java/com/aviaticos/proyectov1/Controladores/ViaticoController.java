package com.aviaticos.proyectov1.Controladores;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aviaticos.proyectov1.Entidades.Viatico;
import com.aviaticos.proyectov1.Servicios.ViaticoServicio;


@RestController
@RequestMapping("/api/viaticos")
@CrossOrigin(origins = "http://localhost:4200")
public class ViaticoController {

    @Autowired
    private ViaticoServicio viaticoServ;

    @PostMapping("/crear")
    public ResponseEntity<Viatico>crearViatico(@RequestBody Viatico viatico){
        System.out.println("JSON recibido en el controlador: " + viatico.toString());
        Viatico newViatico = viaticoServ.nuevoViatico(viatico);
    return new ResponseEntity<>(newViatico,HttpStatus.CREATED);
    }
    
    @GetMapping("/listar")
    public ResponseEntity<List<Viatico>>allViaticos(){
        List<Viatico> viaticos = viaticoServ.getViaticos();
    return new ResponseEntity<>(viaticos,HttpStatus.OK);
    }


    @GetMapping("/busqueda/{identificacion}")
    public ResponseEntity<List<Viatico>>viaticoPorID(@PathVariable String identificacion){
        List<Viatico> viaticos = viaticoServ.getIdentificacion(identificacion);

        if(viaticos.isEmpty()){
             return ResponseEntity.noContent().build();
        }
    return new ResponseEntity<>(viaticos,HttpStatus.OK);
    }

}
