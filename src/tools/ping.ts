import { ClinikoClient } from '../cliniko-client.js';

export function registerPingTools(server: any, client: ClinikoClient) {
  server.tool('cliniko_ping', {
    description: 'Confirms the Cliniko MCP is connected and the API key is valid. Returns the name(s) of the clinic business(es) the API key has access to. Use this to self-test the connection.',
    inputSchema: {
      type: 'object',
      properties: {}
    },
  }, async () => {
    try {
      const response = await client.listBusinesses();
      const businesses = response.businesses || [];

      if (businesses.length === 0) {
        return {
          content: [{
            type: 'text',
            text: 'Connected to Cliniko, but no businesses are visible to this API key. The key may have insufficient permissions.'
          }]
        };
      }

      const names = businesses.map((b: any) => b.business_name || b.label || `Business #${b.id}`).join(', ');
      const summary = businesses.length === 1
        ? `Connected to Cliniko. Clinic: ${names}.`
        : `Connected to Cliniko. ${businesses.length} clinics visible: ${names}.`;

      return {
        content: [{
          type: 'text',
          text: summary
        }]
      };
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Cliniko connection failed: ${msg}. The most common cause is an incorrect API key — uninstall and reinstall the extension, then re-enter the key.`);
    }
  });
}
