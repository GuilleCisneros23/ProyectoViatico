package com.aviaticos.proyectov1.Controladores;

import com.aviaticos.proyectov1.Entidades.Viatico;
import com.aviaticos.proyectov1.Servicios.ViaticoServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/api/viaticos")
public class ViaticoController {

    @Autowired
    private ViaticoServicio viaticoServ;

    @PostMapping("/crear")
    public ResponseEntity<Viatico>crearViatico(@RequestBody Viatico viatico){
        Viatico newViatico = viaticoServ.nuevoViatico(viatico);
    return new ResponseEntity<>(newViatico,HttpStatus.CREATED);
    }
    
    @GetMapping("/listar")
    public ResponseEntity<List<Viatico>>allViaticos(){
        List<Viatico> viaticos = viaticoServ.getViaticos();
    return new ResponseEntity<>(viaticos,HttpStatus.OK);
    }
}
