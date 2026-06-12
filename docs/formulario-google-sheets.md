# Conectar el formulario de contacto a Google Sheets

El formulario de la sección **"Trabajemos juntos"** (componente `components/Contact.tsx`)
envía los datos a un **Google Apps Script** que los escribe en una hoja de cálculo de Google.

Mientras no haya un endpoint configurado, el formulario **abre el correo** con los datos
como respaldo, así que nunca se pierde un mensaje.

## Pasos (una sola vez, ~5 min)

1. Crea una hoja nueva en <https://sheets.new> y ponle nombre, p. ej. **"Contactos Portafolio"**.
2. En esa hoja: menú **Extensiones → Apps Script**.
3. Borra todo el código de ejemplo y pega esto:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    // crea los encabezados la primera vez
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Fecha", "Nombre", "Email", "Empresa",
        "Tipo de proyecto", "Mensaje", "Origen"
      ]);
    }

    var p = e.parameter;
    sheet.appendRow([
      p.fecha   || new Date(),
      p.nombre  || "",
      p.email   || "",
      p.empresa || "",
      p.tipo    || "",
      p.mensaje || "",
      p.origen  || ""
    ]);

    // (opcional) avísame por correo en cada envío:
    // MailApp.sendEmail("hello@ernestodorantes.com",
    //   "Nuevo contacto — " + (p.nombre || ""),
    //   "Nombre: " + p.nombre + "\nEmail: " + p.email +
    //   "\nEmpresa: " + p.empresa + "\nTipo: " + p.tipo +
    //   "\n\n" + p.mensaje);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Guarda (💾).
5. Botón **Implementar → Nueva implementación**.
   - Tipo: **Aplicación web**
   - Descripción: *Formulario portafolio*
   - **Ejecutar como:** Yo (tu cuenta)
   - **Quién tiene acceso:** **Cualquier persona**
   - **Implementar** → autoriza los permisos que pida.
6. Copia la **URL de la aplicación web** (termina en `/exec`).

## Conectarla al sitio

Agrega la URL como variable de entorno en Vercel:

1. Vercel → proyecto → **Settings → Environment Variables**.
2. Nombre: `NEXT_PUBLIC_FORM_ENDPOINT`
   Valor: *(la URL `/exec`)*
   Entornos: Production (y Preview si quieres).
3. **Redeploy** del proyecto.

Para probar en local, crea un archivo `.env.local` en la raíz con:

```
NEXT_PUBLIC_FORM_ENDPOINT=https://script.google.com/macros/s/XXXX/exec
```

Listo: cada envío del formulario aparecerá como una fila nueva en tu hoja.
