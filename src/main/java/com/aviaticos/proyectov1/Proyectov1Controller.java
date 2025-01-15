package com.aviaticos.proyectov1;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Proyectov1Controller {

    @RequestMapping("/registro")
    public String intro(){
        return "Probando Springboot 4";
    }

}