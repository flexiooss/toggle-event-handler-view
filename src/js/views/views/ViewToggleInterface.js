import {isImplement} from '@flexio-oss/js-helpers'

export const viewToggleInterface = (Base) => {
  /**
   * @interface
   */
  return class ViewToggleInterface extends Base {
    /**
     *
     */
    title() {
      throw new Error('should be override')
    }

    /**
     *
     */
    content() {
      throw new Error('should be override')
    }
  }

}

const constructorString = Object.getPrototypeOf(new (viewToggleInterface((class e {
})))).constructor.toString()

/**
 *
 * @param {ViewToggleInterface} inst
 * @return {boolean}
 */
export const implementsViewToggleInterface = (inst) => {
  return isImplement(inst, constructorString)
}
