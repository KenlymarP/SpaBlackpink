<?php include 'includes/layout/header.php'  ?>

<body>


  <div class="contenedor-estetica">
    <div class="imagen"></div>
    <div class="app">
      <header class="header">
        <h1>Spa<span> Blackpink</span></h1>
      </header>
      <nav class="tabs">
        <button type="button" data-paso='1'>Servicios</button>
        <button type="button" data-paso='2'>Informacion Cliente</button>
        <button type="button" data-paso='3'>Resumen</button>
      </nav>

      <div class="seccion" id="paso-1">
        <h2>Servicios</h2>
        <p class="centrar-texto">Elige tus Servicios a Continuación</p>
        <div id="servicios" class="listado-servicio"></div>
      </div>
      <div class="seccion" id="paso-2">
        <h2>Tus Datos y Cita</h2>
        <p class="centrar-texto">Coloca tus datos y fecha para tu cita</p>
        <form action="" class="formulario">
          <div class="campo">
            <label for="nombre">Nombre</label>
            <input type="text" name="nombre" id="nombre">
          </div>

          <div class="campo">
            <label for="fecha">Fecha</label>
            <input type="date" name="fecha" id="fecha">
          </div>

          <div class="campo">
            <label for="hora">Hora</label>
            <input type="time" name="hora" id="hora">
          </div>
        </form>
      </div>
      <div class="seccion contenido-resumen" id="paso-3">
        <h2>Resumen</h2>
      </div>

      <div class="paginacion">
        <button id="anterior">
          &laquo; Anterior
        </button>

        <button id="siguiente">
          Siguiente &raquo;
        </button>
      </div>
    </div>

  </div>

</body>

<?php include 'includes/layout/footer.php' ?>