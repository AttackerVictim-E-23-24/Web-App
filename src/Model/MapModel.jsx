// MapModel.js
class MapModel {
  constructor() {
    this.center = { lat: 10.185660968064957, lng: -64.68570033979893 };
    this.polygons = []; // Estado para los polígonos
    this.manualPoints = []; // Estado para los puntos manuales
    this.currentPolygon = []; // Estado para el polígono actual
  }

  getCenter() {
    return this.center;
  }

  getPolygons() {
    return this.polygons;
  }

  getManualPoints() {
    return this.manualPoints; // Nuevo método para obtener los puntos manuales
  }

  addPolygon(polygon) {
    this.polygons.push(polygon);
  }

  addManualPoint(point) {
    this.manualPoints.push(point); // Nuevo método para agregar un punto manual
  }

  clearManualPoints() {
    this.manualPoints = []; // Nuevo método para borrar todos los puntos manuales
  }
  addPointToCurrentPolygon(lat, lng) {
    this.currentPolygon.push({ lat, lng }); // Agrega un punto al polígono actual
  }

  finishCurrentPolygon() {
    this.polygons.push(this.currentPolygon); // Agrega el polígono actual a los polígonos
    this.currentPolygon = []; // Limpia el polígono actual
  }
  
  addPointToComplexPolygon(lat, lng) {
    this.currentPolygon.push({ lat, lng }); // Agrega un punto al polígono complejo actual
  }

  finishComplexPolygon() {
    this.polygons.push(this.currentPolygon); // Agrega el polígono complejo actual a los polígonos
    this.currentPolygon = []; // Limpia el polígono complejo actual
  }

  convertComplexPolygonToPolygon(index) {
    this.polygons[index] = this.polygons[index].map(point => ({ lat: point.lat, lng: point.lng })); // Convierte el polígono complejo en un polígono normal
  }
}

export default MapModel;
