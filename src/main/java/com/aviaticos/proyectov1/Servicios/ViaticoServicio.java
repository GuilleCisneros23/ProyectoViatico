package com.aviaticos.proyectov1.Servicios;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.aviaticos.proyectov1.Entidades.Viatico;
import com.aviaticos.proyectov1.Repositorios.ViaticoRepository;

@Service
public class ViaticoServicio {

    @Autowired
    private ViaticoRepository viaticoRepo;

    //Registro de viaticos en base de datos
    public Viatico nuevoViatico(Viatico viatico){
        Date hoy = new Date();
        
        // Verificar si la fecha de registro está en el futuro
        if (viatico.getFecha_registro().after(hoy)) {
            throw new IllegalArgumentException("La fecha de ingreso no puede ser mayor a la fecha actual.");
        }
        
        // Calcular la diferencia en milisegundos entre hoy y la fecha de registro
        Long diferenciaMillis = hoy.getTime() - viatico.getFecha_registro().getTime();
        Long diferenciaDias = diferenciaMillis / (1000 * 60 * 60 * 24);
    
        // Verificar si la fecha está dentro del rango de 90 días
        if(diferenciaDias < 0 || diferenciaDias > 90){
            throw new IllegalArgumentException("Fecha de ingreso inválida, debe ser entre 90 días atrás y hoy.");
        }
    
        return viaticoRepo.save(viatico);
    }
    

    //Obtención de todos los viaticos
    public List<Viatico> getViaticos(){
        return viaticoRepo.findAll();
    }

    //Busqueda de viaticos por medio de la identificación del agente que las registro
    public List<Viatico> getIdentificacion(String identificacion){
        return viaticoRepo.findByIdentificacion(identificacion);
    }
  
}
