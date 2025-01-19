package com.aviaticos.proyectov1.Servicios;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aviaticos.proyectov1.Entidades.Viatico;
import com.aviaticos.proyectov1.Repositorios.ViaticoRepository;

@Service
public class ViaticoServicio {

    @Autowired
    private ViaticoRepository viaticoRepo;

    // Registro de viáticos en base de datos
    public Viatico nuevoViatico(Viatico viatico) {

        Date hoy = new Date();
    
        if (viatico.getFecha_registro() == null) {
            throw new IllegalArgumentException("La fecha de registro no puede ser null.");
        }
    
        if (viatico.getFecha_registro().after(hoy)) {
            throw new IllegalArgumentException("La fecha de ingreso no puede ser mayor a la fecha actual.");
        }
    
        Long diferenciaMillis = hoy.getTime() - viatico.getFecha_registro().getTime();
        Long diferenciaDias = diferenciaMillis / (1000 * 60 * 60 * 24);
    
        // Verificar si la fecha está dentro del rango de 90 días
        if (diferenciaDias < 0 || diferenciaDias > 90) {
            throw new IllegalArgumentException("Fecha de ingreso inválida, debe ser entre 90 días atrás y hoy.");
        }

        // Verificación de que la fecha de inicio no sea mayor a la fecha de fin
        if (viatico.getFechaInicio().after(viatico.getFechaFin())) {
            throw new IllegalArgumentException("La fecha de inicio no puede ser mayor a la fecha de fin.");
        }
        
    
        return viaticoRepo.save(viatico);
    }
    

    // Obtención de todos los viáticos
    public List<Viatico> getViaticos() {
        return viaticoRepo.findAll();
    }

    // Búsqueda de viáticos por medio de la identificación del agente que los registró
    public List<Viatico> getIdentificacion(String identificacion) {
        return viaticoRepo.findByIdentificacion(identificacion);
    }
}