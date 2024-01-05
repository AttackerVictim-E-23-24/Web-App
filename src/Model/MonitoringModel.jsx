// MonitoringModel.js
class MonitoringModel {
  constructor(id, startDate , frequency , downtime , offlineTime , minDistance , record , endDate ) {
    this.id = id;
    this.startDate = startDate;
    this.frequency = frequency;
    this.downtime = downtime;
    this.offlineTime = offlineTime;
    this.minDistance = minDistance;
    this.record = record;
    this.endDate = endDate;
  }
}

export default MonitoringModel;
