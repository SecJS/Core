/**
 * @secjs/core
 *
 * (c) João Lenon <lenon@secjs.com.br>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Config } from '@secjs/config'
import { Http, Router } from '@secjs/http'

class Factory {
  private _config: Config
  private _router: Router
  private _httpServer: Http

  buildConfig(configPath?: string): this {
    this._config = new Config()

    this._config.loadSync(configPath)

    return this
  }

  buildHttpServer(): this {
    this._httpServer = new Http()
    this._router = new Router(this._httpServer)

    return this
  }

  getConfig(): Config {
    return this._config
  }

  getRouter(): Router {
    return this._router
  }

  getHttpServer(): Http {
    return this._httpServer
  }
}

export default new Factory()
