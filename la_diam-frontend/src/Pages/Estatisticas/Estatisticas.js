import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  Container,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Spinner,
  Alert,
} from "reactstrap";
import { Card, CardBody } from "reactstrap";
import { fetchProducts } from "../../BackendCalls/getters";

// Registrar os componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// MOCK: Substitua por chamada real ao backend!
const mockFetchProductSalesStats = async (timeRange) => {
  let products = await fetchProducts();
 
  return {
    labels: products.map((p) => p.name),
    datasets: [
      {
        label: "Unidades Vendidas",
        data: products.map((p) => p.nr_of_orders || 0),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
};

const Estatisticas = () => {
  const [chartData, setChartData] = useState(null);
  const [timeRange, setTimeRange] = useState("last7days");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadChartData = async () => {
      setLoading(true);
      setError(null);
      setChartData(null);
      try {
        const data = await mockFetchProductSalesStats(timeRange);
        setChartData(data);
      } catch (err) {
        setError("Falha ao carregar dados do gráfico.");
      } finally {
        setLoading(false);
      }
    };
    loadChartData();
  }, [timeRange]);

  const handleTimeRangeChange = (e) => setTimeRange(e.target.value);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Unidades Vendidas por Produto",
        font: { size: 18, weight: "bold" },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.parsed.y} unidades`,
        },
      },
    },
    scales: {
      x: {
        title: { display: true, text: "Produtos", font: { weight: "bold" } },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Unidades Vendidas",
          font: { weight: "bold" },
        },
        ticks: { precision: 0 },
      },
    },
  };

  return (
    <Container fluid className="p-3 p-md-4 bg-light min-vh-100">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center text-primary">
        Painel de Estatísticas
      </h1>
      {/* <Card className="mb-4 shadow-sm">
        <CardBody>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label className="fw-semibold" for="timeRangeSelect">
                  Período:
                </Label>
                <Input
                  id="timeRangeSelect"
                  type="select"
                  value={timeRange}
                  onChange={handleTimeRangeChange}
                >
                  <option value="last7days">Últimos 7 dias</option>
                  <option value="last30days">Últimos 30 dias</option>
                  <option value="last90days">Últimos 90 dias</option>
                  <option value="allTime">Desde o início</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
      </Card> */}
      <Card className="shadow-sm">
        <CardBody>
          {loading && (
            <div className="text-center p-5">
              <Spinner
                color="primary"
                style={{ width: "3rem", height: "3rem" }}
              />
              <p className="mt-3">Carregando dados do gráfico...</p>
            </div>
          )}
          {error && (
            <Alert color="danger" className="text-center">
              {error}
            </Alert>
          )}
          {!loading &&
            !error &&
            chartData &&
            chartData.datasets[0].data.length > 0 && (
              <div style={{ height: "400px", position: "relative" }}>
                <Bar options={chartOptions} data={chartData} />
              </div>
            )}
          {!loading &&
            !error &&
            (!chartData || chartData.datasets[0].data.length === 0) && (
              <Alert color="info" className="text-center">
                Nenhum dado encontrado para o período selecionado.
              </Alert>
            )}
        </CardBody>
      </Card>
    </Container>
  );
};

export default Estatisticas;
