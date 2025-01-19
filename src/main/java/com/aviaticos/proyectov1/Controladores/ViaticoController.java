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
@RequestMapping("/api/viaticos") // Ruta base para este controlador.
@CrossOrigin(origins = "http://localhost:4200") // Permite el acceso desde el frontend alojado en localhost:4200.
public class ViaticoController {

    @Autowired
    private ViaticoServicio viaticoServ; // Servicio para la lógica de negocio relacionada con los viáticos.

    /*Endpoint para la creación del viático en back end*/
    @PostMapping("/crear")
    public ResponseEntity<Viatico> crearViatico(@RequestBody Viatico viatico) {
        Viatico newViatico = viaticoServ.nuevoViatico(viatico); //Llama al servicio para crear un nuevo viático.
        return new ResponseEntity<>(newViatico, HttpStatus.CREATED); //confirma la creación con un 201.
    }

    /*Enpoint para obtener la lista completa de viaticos registrados (Se uso en as pruebas iniciales pero no esta implementado)*/
    @GetMapping("/listar")
    public ResponseEntity<List<Viatico>> allViaticos() {
        List<Viatico> viaticos = viaticoServ.getViaticos();
        return new ResponseEntity<>(viaticos, HttpStatus.OK);
    }

    /*Enpint que obtiene todos los viáticos basado en la identificación de quien los creo*/
    @GetMapping("/busqueda/{identificacion}")
    public ResponseEntity<List<Viatico>> viaticoPorID(@PathVariable String identificacion) {
        List<Viatico> viaticos = viaticoServ.getIdentificacion(identificacion); // Busca los viáticos por identificación.

        if (viaticos.isEmpty()) { //Si no hay viáticos retorna un 204
            return ResponseEntity.noContent().build();
        }
        return new ResponseEntity<>(viaticos, HttpStatus.OK);
    }

}
