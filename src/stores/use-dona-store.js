import { Vector3 } from "three";
import { create } from "zustand";

/**
 * useDonaStore is a Zustand store that manages the transformations of a 3D object (referred to as "Dona").
 * It allows updating the position, rotation, and scale of the object.
 */
const useDonaStore = create((set) => ({
  /**
   * newTransformsDona holds the current transformation states of the 3D object.
   * It includes:
   * - position: A Vector3 object representing the position of the object.
   * - rotation: A Vector3 object representing the rotation of the object.
   * - scale: A Vector3 object representing the scale of the object.
   */
  newTransformsDona: {
    position: new Vector3(),
    rotation: new Vector3(),
    scale: new Vector3(),
  },

  /**
   * setDonaTransforms is a function to update the transformation states of the 3D object.
   * It takes an object with new transformation values and merges them with the existing state.
   * 
   * @param {Object} newTransformsDona - An object containing new transformation values (position, rotation, scale).
   */
  setDonaTransforms: (newTransformsDona) =>
    set((state) => ({
      newTransformsDona: {
        ...state.newTransformsDona, 
        ...newTransformsDona,
      },
    })),
}));

export default useDonaStore;
