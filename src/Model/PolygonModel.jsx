// PolygonModel.js
import PointModel from './PointModel';

class PolygonModel {
  constructor() {
    this.points = []; // Lista de PointModel
  }

  getPoints() {
    return this.points;
  }

  addPoint(point) {
    if (!(point instanceof PointModel)) {
      throw new Error('Invalid argument: point must be an instance of PointModel');
    }
    this.points.push(point); // Agrega un PointModel a la lista
  }

  clearPoints() {
    this.points = []; // Borra todos los PointModel de la lista
  }
}

export default PolygonModel;