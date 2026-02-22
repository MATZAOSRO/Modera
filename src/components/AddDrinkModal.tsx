import { useState } from 'react';
import { DrinkType } from '../types';
import { useAppContext } from '../context/AppContext';
import { Beer, Wine, Martini, Droplets, X, Coffee, GlassWater } from 'lucide-react';

type AddDrinkModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const drinkOptions: { type: DrinkType; label: string; icon: any; color: string; defaultUnits: number }[] = [
  { type: 'cerveza', label: 'Cerveza', icon: Beer, color: 'text-amber-500', defaultUnits: 1 },
  { type: 'vino', label: 'Vino', icon: Wine, color: 'text-rose-600', defaultUnits: 1 },
  { type: 'coctel', label: 'Cóctel', icon: Martini, color: 'text-indigo-500', defaultUnits: 1.5 },
  { type: 'destilado', label: 'Destilado', icon: Coffee, color: 'text-orange-700', defaultUnits: 1 },
  { type: 'agua', label: 'Agua', icon: Droplets, color: 'text-sky-500', defaultUnits: 0 },
  { type: 'mocktail', label: 'Mocktail', icon: GlassWater, color: 'text-teal-500', defaultUnits: 0 },
];

export function AddDrinkModal({ isOpen, onClose }: AddDrinkModalProps) {
  const { addConsumo } = useAppContext();
  const [selectedType, setSelectedType] = useState<DrinkType>('cerveza');
  const [units, setUnits] = useState<number>(1);

  if (!isOpen) return null;

  const handleTypeSelect = (type: DrinkType, defaultUnits: number) => {
    setSelectedType(type);
    setUnits(defaultUnits);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addConsumo(selectedType, units);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center p-4 border-b border-slate-100">
          <h3 className="font-bold text-lg text-slate-900">Registrar Bebida</h3>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">¿Qué estás tomando?</label>
            <div className="grid grid-cols-3 gap-3">
              {drinkOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = selectedType === option.type;
                return (
                  <button
                    key={option.type}
                    type="button"
                    onClick={() => handleTypeSelect(option.type, option.defaultUnits)}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${
                      isSelected 
                        ? 'border-teal-500 bg-teal-50 ring-1 ring-teal-500' 
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <Icon size={24} className={option.color} />
                    <span className="text-xs font-medium text-slate-700">{option.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Unidades de Alcohol</label>
            <div className="flex items-center gap-4">
              <input
                type="number"
                step="0.5"
                min="0"
                value={units}
                onChange={(e) => setUnits(parseFloat(e.target.value) || 0)}
                className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm px-4 py-2 border"
                disabled={selectedType === 'agua' || selectedType === 'mocktail'}
              />
              <span className="text-sm text-slate-500 whitespace-nowrap">
                {units === 1 ? 'Unidad' : 'Unidades'}
              </span>
            </div>
            <p className="mt-2 text-xs text-slate-500">
              {selectedType === 'agua' || selectedType === 'mocktail' 
                ? 'Las bebidas sin alcohol no suman unidades.' 
                : 'Una unidad equivale a 10ml de alcohol puro (ej. una caña de cerveza o copa pequeña de vino).'}
            </p>
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-slate-300 shadow-sm text-sm font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
