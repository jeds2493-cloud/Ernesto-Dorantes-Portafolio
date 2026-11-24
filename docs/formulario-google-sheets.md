# Conectar el formulario de contacto a Google Sheets

El formulario (componente `components/ContactForm.tsx`, en la ventana `ContactModal` y en el cierre
de la página) manda los datos a la ruta del propio sitio **`/api/contacto`**, y esa ruta los reenvía
desde el servidor a un **Google Apps Script** que los escribe en una hoja de Google.

La persona ve «¡Gracias!» solo si el script contestó 2xx y no trae `{"ok":false}`. Si no, ve el
mensaje de error, con lo que escribió intacto y el correo de respaldo.

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
        "Tipo de proyecto", "Mensaje", "Origen"   // origen: «ernestodorantes.com · hero»
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

    // (opcional) avísame por correo en cada envío (el origen dice qué botón lo abrió):
    // MailApp.sendEmail("hello@ernestodorantes.com",
    //   "Nuevo contacto — " + (p.nombre || ""),
    //   "Nombre: " + p.nombre + "\nWhatsApp: " + p.whatsapp +
    //   "\nCorreo: " + (p.email || "") + "\nTipo: " + (p.tipo || "") +
    //   "\nCombinación: " + (p.combinacion || "") + "\nOrigen: " + (p.origen || "") +
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

La URL vive solo en el servidor. La ruta `/api/contacto` busca, en este orden:
`FORM_ENDPOINT`, `NEXT_PUBLIC_FORM_ENDPOINT` (la configuración anterior de Vercel sigue sirviendo)
y, si no hay ninguna, la URL `/exec` que trae el código.

1. Vercel → proyecto → **Settings → Environment Variables**.
2. Nombre: `FORM_ENDPOINT`
   Valor: *(la URL `/exec`)*
   Entornos: Production (y Preview si quieres).
3. **Redeploy** del proyecto. Ya puedes borrar `NEXT_PUBLIC_FORM_ENDPOINT`.

Para probar en local, crea `.env.local` en la raíz. **Apunta a un servidor de prueba, no a la hoja real:**

```
FORM_ENDPOINT=http://127.0.0.1:3399/exec
```

## Qué guarda cada fila

`origen` trae el botón que abrió el formulario: `ernestodorantes.com · header`, `hero`,
`paquete-<tipo>`, `quien`, `preguntas`, `sticky`, `cierre` o `armador`. El WhatsApp va también al
inicio del mensaje, por si la hoja no tiene esa columna.

Listo: cada envío del formulario aparecerá como una fila nueva en tu hoja.
