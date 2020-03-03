import path = require('path')
import ts = require('typescript')
import allSettled = require('promise.allsettled')
import { LanguageService } from './language-service'
import { writeFile } from './file-util'
import { logEmitted, logError, logWarning } from './logger'
import { getTypeRootsDts } from './type-roots'
import { pathReplacer } from './out-root';

export async function generate(filenames: string[], options: ts.CompilerOptions): Promise<void> {
  const vueFiles = filenames
      .filter(file => /\.vue$/.test(file))
      .map(file => path.resolve(file))

  // Should not emit if some errors are occurred
  const service = new LanguageService([
    ...getTypeRootsDts(options),
    ...vueFiles
  ], options);



  await allSettled(
      vueFiles.map(file => new Promise((resolve, reject) => {
        const dts = service.getDts(file)
        let dtsPath = `${file}${ts.Extension.Dts}`

        if (dts.errors.length > 0) {
          logError(file, dts.errors)
          return
        }
        const {result} = dts

        if (result === null) return

        return setImmediate(() => {
          if(pathReplacer) dtsPath = pathReplacer(dtsPath);
          writeFile(dtsPath, result)
              .then(() => {
                logEmitted(dtsPath)
                resolve()
              })
              .catch(e => {
                logError(dtsPath, [e.message])
                reject()
              })
        })
      }))
  )
}
