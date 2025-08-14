const puppeteer = require("puppeteer");
const fs = require("fs");

/**
 * Servicio para automatizar operaciones en seminuevos.com usando Puppeteer
 */
class PuppeteerService {
  constructor() {
    this.browser = null;
    this.page = null;
  }

  /**
   * Inicializa el navegador en modo headless
   */
  async initializeBrowser() {
    try {
      this.browser = await puppeteer.launch({
        headless: true,
        executablePath:
          "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-dev-shm-usage",
          "--disable-accelerated-2d-canvas",
          "--no-first-run",
          "--no-zygote",
          "--disable-gpu",
        ],
      });

      this.page = await this.browser.newPage();

      // Configurar viewport
      await this.page.setViewport({ width: 1366, height: 768 });

      // Configurar user agent
      await this.page.setUserAgent(
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      );

      console.log("Navegador inicializado correctamente");
      return true;
    } catch (error) {
      console.error("Error al inicializar el navegador:", error);
      throw error;
    }
  }

  /**
   * Navega a seminuevos.com
   */
  async navigateToSeminuevos() {
    try {
      console.log("Navegando a seminuevos.com...");
      await this.page.goto("https://www.seminuevos.com/", {
        waitUntil: "networkidle2",
        timeout: 30000,
      });

      console.log("Página cargada correctamente");
      return true;
    } catch (error) {
      console.error("Error al navegar a seminuevos.com:", error);
      throw error;
    }
  }

  /**
   * Inicia sesión en seminuevos.com
   * @param {string} email - Email del usuario
   * @param {string} password - Contraseña del usuario
   */
  async login(email, password) {
    try {
      console.log("Iniciando proceso de login...");

      // Buscar y hacer clic en el botón de "Ingresar"
      await this.page.waitForSelector(".login-btn", { timeout: 10000 });
      await this.page.click(".login-btn");

      // Esperar a que aparezca el formulario de login
      await this.page.waitForSelector(
        'input[type="email"], input[name="email"], #email',
        { timeout: 10000 }
      );

      // Llenar el formulario de login
      await this.page.type(
        'input[type="email"], input[name="email"], #email',
        email
      );
      await this.page.type(
        'input[type="password"], input[name="password"], #password',
        password
      );

      // Enviar el formulario
      await this.page.click(
        'button[type="submit"], input[type="submit"], .login-submit'
      );

      // Esperar a que se complete el login
      await this.page.waitForNavigation({
        waitUntil: "networkidle2",
        timeout: 15000,
      });

      console.log("Login completado exitosamente");
      return true;
    } catch (error) {
      console.error("Error durante el login:", error);
      throw error;
    }
  }

  /**
   * Publica un anuncio de carro
   * @param {Object} carData - Datos del carro a publicar
   */
  async publishCarAd(carData) {
    try {
      console.log("Iniciando publicación de anuncio...");

      // Buscar y hacer clic en "Vende tu auto" o botón similar
      await this.page.waitForSelector(
        'a[href*="tablero"],a.go-dashboard.p-t-md.p-b-md.m-t',
        { timeout: 10000 }
      );
      await this.page.click(
        'a[href*="tablero"], a.go-dashboard.p-t-md.p-b-md.m-t'
      );

      await this.page.waitForSelector('a[href*="publicar"]', {
        timeout: 10000,
      });
      await this.page.click('a[href*="publicar"]');

      // Esperar y hacer clic en el botón "Elegir plan"
      await this.page.waitForSelector(".mantine-Button-root", {
        timeout: 10000,
      });
      const button = (await this.page.$$(".mantine-Button-root"))[0];
      if (button) {
        await button.click();
        await new Promise((resolve) => setTimeout(resolve, 10000));
      }

      await this.fillCarForm(carData);

      //   // Enviar el formulario
      //   await this.page.click('button[type="submit"], input[type="submit"], .publish-submit');

      //   // Esperar confirmación
      //   await this.page.waitForSelector('.success-message, .confirmation', { timeout: 20000 });

      await new Promise((resolve) => setTimeout(resolve, 50000));
      await this.page.screenshot({
        path: "llenado.png",
        fullPage: true,
        type: "jpeg",
        quality: 100,
        omitBackground: true,
      });

      // const html = await this.page.content();
      // await fs.promises.writeFile("form.html", html);
      // console.log("HTML guardado en form.html");

      console.log("Anuncio publicado exitosamente");
      return true;
    } catch (error) {
      console.error("Error al publicar el anuncio:", error);
      throw error;
    }
  }

  /**
   * Llena el formulario de publicación con los datos del carro
   * @param {Object} carData - Datos del carro
   */
  async fillCarForm(carData) {
    console.log("Llenando el formulario de publicación...");
    try {
      console.log(await this.page.url().toString());

      await this.selectByLabel("Marca", carData.marca, "listbox");
      await this.selectByLabel("Modelo", carData.modelo, "listbox");
      await this.selectByLabel("Año", String(carData.anio), "listbox");
      await this.selectByLabel("Versión", carData.version, "listbox");
      await this.selectByLabel("Subtipo", carData.subtipo, "listbox");
      await this.selectByLabel("Color", carData.color, "listbox");

      await this.selectByLabel("Recorrido", carData.recorrido, "text");
      await this.selectByLabel("Precio", `${carData.precio}`, "text");

      await this.selectByLabel("Negociable", "Si", "radio");

      await this.selectByLabel("Código Postal", carData.cp, "listbox", true);
      await this.selectByLabel("Código Postal", carData.cp, "listbox");

      // await this.validatePrice(carData.precio)

      console.log("Siguiente");
      await this.page.evaluate(
        () => {
          const botones = Array.from(document.querySelectorAll("button"));
          const btn = botones.find((b) => b.textContent.trim() === "Siguiente");
          if (btn) btn.click();
        },
        { timeout: 10000 }
      );

      await this.selectByLabel("Descripción", carData.descripcion, "textArea");

      await this.page.waitForSelector('input[type="file"]', { timeout: 10000 });

      // Subir uno o más archivos
      const inputFile = await this.page.$('input[type="file"]', {
        timeout: 10000,
      });
      await inputFile.uploadFile(
        carData.imagenes[0],
        carData.imagenes[1],
        carData.imagenes[2]
      );

      await this.page.evaluate(
        () => {
          const botones = Array.from(document.querySelectorAll("button"));
          const btn = botones.find((b) => b.textContent.trim() === "Siguiente");
          if (btn) btn.click();
        },
        { timeout: 10000 }
      );

      console.log("Formulario llenado correctamente");
    } catch (error) {
      console.error("Error al llenar el formulario:", error);
      throw error;
    }
  }

  async selectByLabel(labelText, value, type, typing = false) {
    const inputId = await this.page.evaluate((labelText) => {
      const label = Array.from(document.querySelectorAll("label")).find((el) =>
        el.innerText.trim().toLowerCase().startsWith(labelText.toLowerCase())
      );
      return label ? label.getAttribute("for") : null;
    }, labelText);

    console.log(labelText, "<===== labelText");
    console.log(value, "<===== value");
    console.log(inputId, "<===== inputId");

    try {
      switch (type) {
        case "listbox":
          if (typing) {
            await this.page.waitForSelector(`#${inputId}`, { timeout: 10000 });
            await this.page.click(`#${inputId}`, { clickCount: 3 }); // opcional: selecciona todo el texto
            await this.page.type(`#${inputId}`, value, { timeout: 10000 });
          }

          const inputIdSelector = `[aria-labelledby="${inputId}-label"]`;
          await this.page.waitForSelector(inputIdSelector, {
            timeout: 10000,
          });
          await this.page.evaluate(
            (selector, data) => {
              const nodes =
                document.querySelector(selector)?.childNodes[0]?.children[0]
                  ?.childNodes[0]?.childNodes[0]?.childNodes[0]?.childNodes ||
                [];

              let encontrado = false;

              nodes.forEach((element) => {
                if (element.innerText.trim().includes(data)) {
                  element.click();
                  encontrado = true;
                }
              });

              if (!encontrado && nodes.length > 0) {
                nodes[0].click();
              }
            },
            `${inputIdSelector}`,
            value,
            { timeout: 10000 }
          );
          break;
        case "text":
          await this.page.waitForSelector(`#${inputId}`);
          await this.page.click(`#${inputId}`, { clickCount: 3 }); // opcional: selecciona todo el texto
          await this.page.type(`#${inputId}`, value);
          break;
        case "radio":
          await this.page.waitForSelector(
            'input[type="radio"][name="negotiable"][value="2"]',
            { timeout: 10000 }
          );
          await this.page.click(
            'input[type="radio"][name="negotiable"][value="2"]',
            { timeout: 10000 }
          );
          break;
        case "textArea":
          await this.page.waitForSelector(`.mantine-RichTextEditor-content p`);
          await this.page.click(`.mantine-RichTextEditor-content p`, {
            clickCount: 3,
          }); // opcional: selecciona todo el texto
          await this.page.type(
            `.mantine-RichTextEditor-content p`,
            carData.descripcion
          );
          break;
        default:
          console.log("No se encontró el tipo de input");
          break;
      }
    } catch (error) {
      console.error("Error al seleccionar el valor:", error);
    } finally {
      await new Promise((resolve) => setTimeout(resolve, 10000));
    }
  }

  async validatePrice(price) {
    const txtMaximo = await this.page.evaluate(() => {
      const label = Array.from(document.querySelectorAll("*")).find(
        (el) => el.textContent.trim() === "Precio máximo *"
      );

      return label ? label.parentElement.innerText : null;
    });
    let maximo = Number.parseFloat(
      txtMaximo.replaceAll(",", "").replaceAll("$", "")
    );

    const txtMinimo = await this.page.evaluate(() => {
      const label = Array.from(document.querySelectorAll("*")).find(
        (el) => el.textContent.trim() === "Precio mínimo *"
      );

      return label ? label.parentElement.innerText : null;
    });
    let minimo = Number.parseFloat(
      txtMinimo.replaceAll(",", "").replaceAll("$", "")
    );

    console.log(maximo, "<===== maximo");
    console.log(minimo, "<===== minimo");
    console.log(price, "<===== price");

    if (!(price >= minimo && price <= maximo)) {
      throw new Error("El precio no es válido");
    }
  }

  /**
   * Cierra el navegador
   */
  async closeBrowser() {
    try {
      if (this.browser) {
        await this.browser.close();
        console.log("Navegador cerrado correctamente");
      }
    } catch (error) {
      console.error("Error al cerrar el navegador:", error);
    }
  }

  /**
   * Proceso completo de publicación
   * @param {Object} carData - Datos del carro
   * @param {string} email - Email del usuario
   * @param {string} password - Contraseña del usuario
   */
  async completePublishProcess(carData, email, password) {
    try {
      await this.initializeBrowser();
      await this.navigateToSeminuevos();
      await this.login(email, password);
      await this.publishCarAd(carData);

      console.log("Proceso de publicación completado exitosamente");
      return { success: true, message: "Anuncio publicado correctamente" };
    } catch (error) {
      console.error("Error en el proceso de publicación:", error);
      throw error;
    } finally {
      await this.closeBrowser();
    }
  }
}

module.exports = PuppeteerService;
