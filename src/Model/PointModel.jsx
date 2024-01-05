// PointModel.js
class PointModel {
  constructor(latitude, longitude) {
    this.latitude = latitude;
    this.longitude = longitude;
  }

  addPoint(latitude, longitude) {
    const point = new PointModel(latitude, longitude);
    this.points.push(point); // Nuevo método para agregar un punto
  }

  clearPoints() {
    this.points = []; // Nuevo método para borrar todos los puntos
  }
}

export default PointModel;