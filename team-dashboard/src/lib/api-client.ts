// API client for interacting with Medusa backend

// Base URL for API requests
const API_BASE_URL =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";

// Helper function to handle API responses
async function handleResponse(response: Response) {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "An error occurred");
  }
  return response.json();
}

// Team authentication
export async function loginTeam(email: string, password: string) {
  const response = await fetch(`${API_BASE_URL}/auth/teams/emailpass`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  return handleResponse(response);
}

// Get current team info
export async function getCurrentTeam(token: string) {
  const response = await fetch(`${API_BASE_URL}/teams/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return handleResponse(response);
}

// Get team products
export async function getTeamProducts(token: string) {
  const response = await fetch(`${API_BASE_URL}/teams/products`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return handleResponse(response);
}

// Get a single product
export async function getTeamProduct(productId: string, token: string) {
  const response = await fetch(`${API_BASE_URL}/teams/products/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return handleResponse(response);
}

// Get team revenue
export async function getTeamRevenue(token: string, timeframe = "month") {
  const response = await fetch(
    `${API_BASE_URL}/teams/revenue?timeframe=${timeframe}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return handleResponse(response);
}

// Get team requests
export async function getTeamRequests(token: string, status?: string) {
  const url = status
    ? `${API_BASE_URL}/teams/requests?status=${status}`
    : `${API_BASE_URL}/teams/requests`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return handleResponse(response);
}

// Create a new request
export async function createRequest(requestData: any, token: string) {
  const response = await fetch(`${API_BASE_URL}/teams/requests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(requestData),
  });
  return handleResponse(response);
}

// Get team payouts
export async function getTeamPayouts(token: string) {
  const response = await fetch(`${API_BASE_URL}/teams/payouts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return handleResponse(response);
}

// Get team analytics
export async function getTeamAnalytics(token: string, period = "month") {
  const response = await fetch(
    `${API_BASE_URL}/teams/analytics?period=${period}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return handleResponse(response);
}

// Get team orders
export async function getTeamOrders(token: string, limit = 10, offset = 0) {
  const response = await fetch(
    `${API_BASE_URL}/teams/orders?limit=${limit}&offset=${offset}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return handleResponse(response);
}
