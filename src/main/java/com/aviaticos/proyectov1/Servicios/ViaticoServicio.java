package com.aviaticos.proyectov1.Servicios;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.aviaticos.proyectov1.Entidades.Viatico;
import com.aviaticos.proyectov1.Repositorios.ViaticoRepository;

// Clase de servicio encargada de gestionar los viáticos, funciona como puente entre el controlador y el repositorio.
// Contiene la lógica de negocio y las validaciones necesarias para la creación y obtención de viáticos.

@Service
public class ViaticoServicio {

    // Inyección para el acceso a los datos en base
    @Autowired
    private ViaticoRepository viaticoRepo;

    //Método para registrar un nuevo viático en la base de datos.
    // Realiza las validaciones antes de guardar el viático, en el front se hace de manera visual esto.
    public Viatico nuevoViatico(Viatico viatico) {

        Date hoy = new Date();
    
        // Verifica que la fecha de registro no sea futura.
        if (viatico.getFecha_registro().after(hoy)) {
            throw new IllegalArgumentException("La fecha de ingreso no puede ser mayor a la fecha actual.");
        }
    
        // Calcula la diferencia de días entre la fecha de registro y la fecha actual.
        Long diferenciaMillis = hoy.getTime() - viatico.getFecha_registro().getTime();
        Long diferenciaDias = diferenciaMillis / (1000 * 60 * 60 * 24);
    
        // Verifica si la fecha de registro está dentro de un rango de 90 días.
        if (diferenciaDias < 0 || diferenciaDias > 90) {
            throw new IllegalArgumentException("Fecha de ingreso inválida, debe ser entre 90 días atrás y hoy.");
        }

        // Verifica que la fecha de inicio no sea mayor a la fecha de fin.
        if (viatico.getFechaInicio().after(viatico.getFechaFin())) {
            throw new IllegalArgumentException("La fecha de inicio no puede ser mayor a la fecha de fin.");
        }
        
        // Guarda el viático en la base de datos y lo devuelve.
        return viaticoRepo.save(viatico);
    }
    

    //Metodo para obtener los viáticos registrados en base (presente en la etapa de pruebas)
    public List<Viatico> getViaticos() {
        return viaticoRepo.findAll();
    }

    //metodo para la busqueda de viáticos basado en la identificación de la persona que los registro
    public List<Viatico> getIdentificacion(String identificacion) {
        return viaticoRepo.findByIdentificacion(identificacion);
    }
}
