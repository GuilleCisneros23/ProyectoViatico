package com.aviaticos.proyectov1.Entidades;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity // Clase entidad JPA.
@Table(name = "viaticos") //Tabla que alberga los elementos de viáticos
public class Viatico {

    @Id // Identificador único del registro (clave primaria).
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Generación automática del ID.
    private Long ID;

    // Fecha de registro del viático, formateada como cadena con el patrón "yyyy-MM-dd".
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @Column(name = "fecha_registro", nullable = false) // Columna no nula.
    private Date fecha_registro;

    // Nombre del agente que ingresa el viático.
    @Column(name = "nombre_agente", nullable = false)
    private String agente;

    // Identificación del cliente relacionado con el viático.
    @Column(name = "identificación_persona", nullable = false)
    private String identificacion;

    // Motivo del viaje que justifica el viático.
    @Column(name = "motivo_viaje", nullable = false)
    private String motivo;

    // Nombre del cliente que realiza el viaje.
    @Column(name = "nombre_cliente", nullable = false)
    private String cliente;

    // Fecha de inicio del viaje.
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @Column(name = "fecha_inicio", nullable = false)
    private Date fechaInicio;

    // Fecha de fin del viaje.
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @Column(name = "fecha_fin", nullable = false)
    private Date fechaFin;

    // Correo electrónico de la persona que aprueba el viático.
    @Column(name = "correo_aprobador", nullable = false)
    private String correoAprobador;

    // Número de archivos encontrados dentro de un archivo comprimido (zip) relacionado con el viático.
    @Column(name = "numero_archivos", nullable = false)
    private int numeroArchivos;

////////////////////////////////////////////////////////////////

    public Viatico() {} // Constructor vacío (requerido por JPA).

//////////////////////////////////////////////////////////////////

    // Métodos getter y setter para acceder y modificar las propiedades de la clase.

    // Getter y setter para ID.
    public void setID(Long ID) { this.ID = ID; }
    public Long getID() { return ID; }

    // Getter y setter para la fecha del registro del viático.
    public void setFecha_registro(Date fecha_registro) { this.fecha_registro = fecha_registro; }
    public Date getFecha_registro() { return fecha_registro; }

    // Getter y setter para el nombre del agente que registra el viático.
    public void setAgente(String agente) { this.agente = agente; }
    public String getAgente() { return agente; }

    // Getter y setter para la identificación del cliente.
    public void setIdentificacion(String identificacion) { this.identificacion = identificacion; }
    public String getIdentificacion() { return identificacion; }

    // Getter y setter para el motivo del viaje.
    public void setMotivo(String motivo) { this.motivo = motivo; }
    public String getMotivo() { return motivo; }

    // Getter y setter para el nombre del cliente.
    public void setCliente(String cliente) { this.cliente = cliente; }
    public String getCliente() { return cliente; }

    // Getter y setter para la fecha de inicio del viaje.
    public void setFechaInicio(Date fechaInicio) { this.fechaInicio = fechaInicio; }
    public Date getFechaInicio() { return fechaInicio; }

    // Getter y setter para la fecha de fin del viaje.
    public void setFechaFin(Date fechaFin) { this.fechaFin = fechaFin; }
    public Date getFechaFin() { return fechaFin; }

    // Getter y setter para el correo del aprobador del viático.
    public void setCorreoAprobador(String correoAprobador) { this.correoAprobador = correoAprobador; }
    public String getCorreoAprobador() { return correoAprobador; }

    // Getter y setter para el número de archivos encontrados en el archivo comprimido.
    public void setNumeroArchivos(int numeroArchivos) { this.numeroArchivos = numeroArchivos; }
    public int getNumeroArchivos() { return numeroArchivos; }

    //////////////////////////////////////////////////////////////////

    // Método toString() para facilitar la visualización de la entidad.
    @Override
    public String toString() {
        return "Viatico{" +
                "ID=" + ID +
                ", fecha_registro=" + fecha_registro +
                ", agente='" + agente + '\'' +
                ", identificacion='" + identificacion + '\'' +
                ", motivo='" + motivo + '\'' +
                ", cliente='" + cliente + '\'' +
                ", fechaInicio=" + fechaInicio +
                ", fechaFin=" + fechaFin +
                ", correoAprobador='" + correoAprobador + '\'' +
                ", numeroArchivos=" + numeroArchivos +
                '}';
    }
}
