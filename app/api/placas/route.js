import { google } from 'googleapis';
import { NextResponse } from 'next/server';


// Configurar cache de 1 hora (sempre exportar um número, 0 = sem cache)
export const revalidate = 3600;

// Habilitar/desabilitar cache
const ENABLE_CACHE = revalidate > 0;

export async function GET() {
    try {
        const spreadsheetId = process.env.SPREADSHEET_ID;

        const sheets = google.sheets({ version: 'v4' });
        
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: 'A1:Z1000',
            key: process.env.GOOGLE_SHEETS_API_KEY,
        });

        const rows = response.data.values;
        
        if (!rows || rows.length === 0) {
            return NextResponse.json({ error: 'Nenhum dado encontrado' }, { status: 404 });
        }

        const headers = rows[0];
        
        const data = rows.slice(1).map(row => {
            const obj = {};
            headers.forEach((header, index) => {
                obj[header] = row[index] || '';
            });
            return obj;
        });

        const responseHeaders = ENABLE_CACHE ? {
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200'
        } : {
            'Cache-Control': 'no-store, no-cache, must-revalidate'
        };

        return NextResponse.json({ data, headers }, {
            headers: responseHeaders
        });
    } catch (error) {
        console.error('Erro ao buscar dados do Google Sheets:', error);
        return NextResponse.json(
            { error: 'Erro ao buscar dados', details: error.message },
            { status: 500 }
        );
    }
}
