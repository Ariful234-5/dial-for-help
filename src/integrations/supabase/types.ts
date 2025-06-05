export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      bookings: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          payment_status: string | null
          provider_id: string
          scheduled_date: string
          service_type: string
          status: string | null
          total_amount: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          payment_status?: string | null
          provider_id: string
          scheduled_date: string
          service_type: string
          status?: string | null
          total_amount?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          payment_status?: string | null
          provider_id?: string
          scheduled_date?: string
          service_type?: string
          status?: string | null
          total_amount?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "service_providers"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_messages: {
        Row: {
          created_at: string | null
          id: string
          is_read: boolean | null
          message: string
          message_type: string | null
          receiver_id: string
          sender_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          message_type?: string | null
          receiver_id: string
          sender_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          message_type?: string | null
          receiver_id?: string
          sender_id?: string
        }
        Relationships: []
      }
      emergency_requests: {
        Row: {
          address: string
          assigned_provider_id: string | null
          created_at: string | null
          description: string
          id: string
          location_lat: number
          location_lng: number
          priority_level: string | null
          resolved_at: string | null
          service_type: string
          status: string | null
          user_id: string
        }
        Insert: {
          address: string
          assigned_provider_id?: string | null
          created_at?: string | null
          description: string
          id?: string
          location_lat: number
          location_lng: number
          priority_level?: string | null
          resolved_at?: string | null
          service_type: string
          status?: string | null
          user_id: string
        }
        Update: {
          address?: string
          assigned_provider_id?: string | null
          created_at?: string | null
          description?: string
          id?: string
          location_lat?: number
          location_lng?: number
          priority_level?: string | null
          resolved_at?: string | null
          service_type?: string
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "emergency_requests_assigned_provider_id_fkey"
            columns: ["assigned_provider_id"]
            isOneToOne: false
            referencedRelation: "service_providers"
            referencedColumns: ["id"]
          },
        ]
      }
      Id: {
        Row: {
          id: number
          "User name": string | null
        }
        Insert: {
          id?: number
          "User name"?: string | null
        }
        Update: {
          id?: number
          "User name"?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string | null
          data: Json | null
          id: string
          is_read: boolean | null
          message: string
          title: string
          type: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          data?: Json | null
          id?: string
          is_read?: boolean | null
          message: string
          title: string
          type?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          data?: Json | null
          id?: string
          is_read?: boolean | null
          message?: string
          title?: string
          type?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string | null
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          location_lat: number | null
          location_lng: number | null
          phone: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          location_lat?: number | null
          location_lng?: number | null
          phone?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          location_lat?: number | null
          location_lng?: number | null
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      provider_earnings: {
        Row: {
          amount: number
          booking_id: string | null
          commission_rate: number | null
          created_at: string | null
          id: string
          net_amount: number | null
          payment_status: string | null
          provider_id: string
        }
        Insert: {
          amount: number
          booking_id?: string | null
          commission_rate?: number | null
          created_at?: string | null
          id?: string
          net_amount?: number | null
          payment_status?: string | null
          provider_id: string
        }
        Update: {
          amount?: number
          booking_id?: string | null
          commission_rate?: number | null
          created_at?: string | null
          id?: string
          net_amount?: number | null
          payment_status?: string | null
          provider_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "provider_earnings_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "provider_earnings_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "service_providers"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string
          id: string
          provider_id: string
          rating: number | null
          request_id: string | null
          user_id: string
        }
        Insert: {
          comment?: string | null
          created_at?: string
          id?: string
          provider_id: string
          rating?: number | null
          request_id?: string | null
          user_id: string
        }
        Update: {
          comment?: string | null
          created_at?: string
          id?: string
          provider_id?: string
          rating?: number | null
          request_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "service_providers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: false
            referencedRelation: "service_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      service_providers: {
        Row: {
          address: string | null
          approval_status: string | null
          availability_status: string | null
          background_check_status: string | null
          company_name: string | null
          completed_jobs: number | null
          created_at: string
          description: string | null
          documents_verified: boolean | null
          emergency_service: boolean | null
          experience_years: number | null
          hourly_rate: number | null
          id: string
          insurance_verified: boolean | null
          is_available: boolean | null
          is_verified: boolean | null
          location_lat: number | null
          location_lng: number | null
          phone: string | null
          profile_image_url: string | null
          rating: number | null
          rejected_reason: string | null
          service_area_km: number | null
          service_type: string
          total_earnings: number | null
          total_reviews: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          address?: string | null
          approval_status?: string | null
          availability_status?: string | null
          background_check_status?: string | null
          company_name?: string | null
          completed_jobs?: number | null
          created_at?: string
          description?: string | null
          documents_verified?: boolean | null
          emergency_service?: boolean | null
          experience_years?: number | null
          hourly_rate?: number | null
          id?: string
          insurance_verified?: boolean | null
          is_available?: boolean | null
          is_verified?: boolean | null
          location_lat?: number | null
          location_lng?: number | null
          phone?: string | null
          profile_image_url?: string | null
          rating?: number | null
          rejected_reason?: string | null
          service_area_km?: number | null
          service_type: string
          total_earnings?: number | null
          total_reviews?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string | null
          approval_status?: string | null
          availability_status?: string | null
          background_check_status?: string | null
          company_name?: string | null
          completed_jobs?: number | null
          created_at?: string
          description?: string | null
          documents_verified?: boolean | null
          emergency_service?: boolean | null
          experience_years?: number | null
          hourly_rate?: number | null
          id?: string
          insurance_verified?: boolean | null
          is_available?: boolean | null
          is_verified?: boolean | null
          location_lat?: number | null
          location_lng?: number | null
          phone?: string | null
          profile_image_url?: string | null
          rating?: number | null
          rejected_reason?: string | null
          service_area_km?: number | null
          service_type?: string
          total_earnings?: number | null
          total_reviews?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      service_requests: {
        Row: {
          created_at: string
          description: string | null
          id: string
          location_lat: number | null
          location_lng: number | null
          provider_id: string | null
          scheduled_at: string | null
          service_type: string
          status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          location_lat?: number | null
          location_lng?: number | null
          provider_id?: string | null
          scheduled_at?: string | null
          service_type: string
          status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          location_lat?: number | null
          location_lng?: number | null
          provider_id?: string | null
          scheduled_at?: string | null
          service_type?: string
          status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_requests_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "service_providers"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: { user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
