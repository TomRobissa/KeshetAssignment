# 📌 Low-Scale, Fast Development System

## **🛠 Technology Choices & Justification**

### **Frontend: Angular 2**
✅ **Why?**
- Angular provides a **structured, component-based architecture**.
- Built-in **TypeScript support** improves maintainability.
- Includes **dependency injection and RxJS** for real-time data handling.

### **Backend: Nest.js**
✅ **Why?**
- A **scalable and modular framework** built on TypeScript.
- Uses **Dependency Injection** for maintainability.
- Built-in support for **WebSockets**.
- Opinionated framework that establishes a standard in development teams.

### **Database: PostgreSQL** (Persistent Storage)
✅ **Why?**
- **Relational Database** → Structured invoice data fits well in SQL.
- Supports **JSON fields** (useful for semi-structured invoice metadata).

### **Priority ERP Integration**
- Introduce an extra API layer only if required to enable faster development.
- **Direct API calls** simplify the architecture. Scale to message queues if required.

### **WebSockets for Real-Time Updates**
✅ **Why WebSockets instead of SSE (server-only updates) or Polling?**
1. **Low Latency:** WebSockets **establish a persistent connection**, reducing request overhead.
2. **Bi-Directional Communication:** WebSockets allow two-way communication. 
3. **Better Performance:** Polling creates **unnecessary load** by making frequent requests. WebSockets **only send data when needed**.
4. **Real time updates** - WebSockets can broadcast updates to all subscribers when a receipt is updated.

### **Additional Considerations**
- **Interchangable Communication:** If we were to switch to other ERPs, we should only replace the matching service.
  (either an API or a service in the back-end)
- **Error Handling & Retries:** Implement **exponential backoff** for failed ERP API calls.
- **Logging & Monitoring:** Use **Elastic Stack (ELK)** for observability. 
- **Containerization:** use Docker To unlock reliable deployment across platforms. 
- **Cloud Providers:** use major cloud providers to relieve server maintenance and ensure smoother deployment. 
- **Optional Upscale:** As the system scales, We can duplicate nodes to handle an increasing number of users. 
  That could include duplicating the front-end, back-end or APIs. 
  As the system scales, we can introduce Kuberenetes to manage containers and monitor containers' health.
- **Load Balancing:** As the system scales, use Nginx to distribute load across multiple nodes. 
- **Message Queues:** As the system scales, use RabbitMQ to manage load on the APIs. 


## **🌟 Summary**
First architectures is designed for **fast development** and **low-scale usage** with:
✅ Direct Priority ERP API calls.
✅ PostgreSQL for persistence.
✅ WebSockets for real-time updates.
✅ A simple yet scalable Nest.js backend.

Second architectures is designed for a **robust system** of many concurrent users with:
✅ Separate APIs to communicate with Priority ERP.
✅ Kuberenetes and Docker to manage containers.
✅ RabbitMQ to manage load.
✅ Nginx to distribute requests across nodes. 
✅ Multiple nodes of each application, to support increasing number of users.
