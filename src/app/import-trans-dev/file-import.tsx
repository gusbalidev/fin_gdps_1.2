"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ShowCSVTable } from "./show-csv-table";

export function FileImport() {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [csvData, setCsvData] = useState<any[]>([]);
    const [showTable, setShowTable] = useState(false);
    const [isProcessed, setIsProcessed] = useState(false); 
    const [splitter, setSplitter] = useState(",");

    useEffect(() => {
        if (file) {
            setIsProcessed(false);
            setShowTable(false);
            setCsvData([]);
        }
    }, [file, splitter]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
            setShowTable(false);
            setCsvData([]);
            setIsProcessed(false); // Reset processed state on new file
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setLoading(true);
        try {
            const text = await file.text();
            const rows = text.split('\n').filter(row => row.trim() !== '');
            const headers = rows[0].split(splitter).map(h => h.trim()); // Use splitter here
            
            if (rows.length > 1) {
                const data = rows.slice(1).map(row => {
                    const values = row.split(splitter); // Use splitter here
                    return headers.reduce((obj: any, header, index) => {
                        obj[header] = values[index]?.trim() || '';
                        return obj;
                    }, {});
                }).filter(row => Object.values(row).some(val => val !== ''));
                
                console.log('Parsed CSV data:', data);
                setCsvData(data);
                setIsProcessed(true);
            }
        } catch (error) {
            console.error('File gagal diunggah:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="w-full space-y-4 max-w-sm items-center">
                <div className="flex flex-col md:flex-row w-full gap-4">
                    <div className="w-full md:w-2/3">
                        <Label htmlFor="csv">Pilih File CSV</Label>
                        <div className="relative mt-2">
                            <Input
                                id="csv"
                                type="file"
                                accept=".csv"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            <label
                                htmlFor="csv"
                                className="inline-flex w-full p-2 border border-blue-500 dark:border-blue-500 truncate"
                            >
                                <span className="text-sm text-blue-600 dark:text-blue-500 hover:text-blue-700 dark:hover:text-blue-300 truncate">
                                    {file ? file.name : "Pilih file..."}
                                </span>
                            </label>
                        </div>
                    </div>
                    
                    <div className="w-full md:w-1/3">
                        <Label>Pemisah Kolom</Label>
                        <Select
                            value={splitter}
                            onValueChange={(value) => {
                                setSplitter(value);
                                setIsProcessed(false);
                                setShowTable(false);
                                setCsvData([]);
                            }}
                        >
                            <SelectTrigger className="mt-2 text-blue-600 dark:text-blue-500 hover:text-blue-700 dark:hover:text-blue-300">
                                <SelectValue placeholder="Pilih pemisah" />
                            </SelectTrigger>
                            <SelectContent className="border border-blue-500 dark:border-blue-500">
                                <SelectItem value=",">Koma (,)</SelectItem>
                                <SelectItem value=";">Titik koma (;)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <Button 
                    onClick={handleUpload}
                    disabled={!file || loading || isProcessed}
                >
                    {loading ? "Mengunggah file..." : "PROSES"}
                </Button>
            </div>

            {csvData.length > 0 && !showTable && (
                <Button 
                    onClick={() => setShowTable(true)}
                    className="mt-4"
                >
                    TAMPILKAN TABEL
                </Button>
            )}

            {showTable && <ShowCSVTable data={csvData} />}
            
        </div>
    );
}